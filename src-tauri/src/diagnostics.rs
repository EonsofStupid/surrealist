use reqwest::{redirect::Policy, Client, Method};
use serde_json::Value;
use std::{str::FromStr, time::Duration};

mod transport;

use transport::diagnostics_url;

const MAX_DIAGNOSTICS_RESPONSE_BYTES: u64 = 16 * 1024 * 1024;
const MAX_DIAGNOSTICS_REQUEST_BYTES: usize = 128 * 1024;

#[tauri::command]
pub async fn runtime_diagnostics_request(
    endpoint: String,
    path: String,
    method: String,
    body: Option<Value>,
) -> Result<Value, String> {
    let method = Method::from_str(&method)
        .map_err(|_| "diagnostics method must be GET or POST".to_owned())?;
    let url = diagnostics_url(&endpoint, &path, method.as_str())?;
    let body = body
        .map(|value| serde_json::to_vec(&value))
        .transpose()
        .map_err(|error| format!("cannot serialize diagnostics request: {error}"))?;
    if body
        .as_ref()
        .is_some_and(|bytes| bytes.len() > MAX_DIAGNOSTICS_REQUEST_BYTES)
    {
        return Err("diagnostics request exceeds 128 KiB".into());
    }

    let client = Client::builder()
        .connect_timeout(Duration::from_secs(4))
        .timeout(Duration::from_secs(15))
        .redirect(Policy::none())
        .build()
        .map_err(|error| format!("cannot build diagnostics client: {error}"))?;
    let mut request = client
        .request(method, url)
        .header("Accept", "application/json")
        .header("Vyrm-Diagnostics-Protocol", "1");
    if let Some(body) = body {
        request = request
            .header("Content-Type", "application/json")
            .body(body);
    }
    let mut response = request
        .send()
        .await
        .map_err(|error| format!("runtime diagnostics request failed: {error}"))?;
    let status = response.status();
    if response
        .content_length()
        .is_some_and(|length| length > MAX_DIAGNOSTICS_RESPONSE_BYTES)
    {
        return Err("runtime diagnostics response exceeds 16 MiB".into());
    }
    let mut bytes = Vec::new();
    while let Some(chunk) = response
        .chunk()
        .await
        .map_err(|error| format!("cannot read diagnostics response: {error}"))?
    {
        if bytes.len().saturating_add(chunk.len()) > MAX_DIAGNOSTICS_RESPONSE_BYTES as usize {
            return Err("runtime diagnostics response exceeds 16 MiB".into());
        }
        bytes.extend_from_slice(&chunk);
    }
    let value: Value = serde_json::from_slice(&bytes)
        .map_err(|error| format!("runtime diagnostics returned invalid JSON: {error}"))?;
    if !status.is_success() {
        let detail = value
            .get("error")
            .and_then(Value::as_str)
            .unwrap_or("runtime rejected the diagnostics request");
        return Err(format!("runtime diagnostics returned {status}: {detail}"));
    }
    Ok(value)
}
