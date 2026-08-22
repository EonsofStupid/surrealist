use url::{Host, Url};

fn is_loopback(host: Host<&str>) -> bool {
	match host {
		Host::Domain(host) => host.eq_ignore_ascii_case("localhost"),
		Host::Ipv4(address) => address.is_loopback(),
		Host::Ipv6(address) => address.is_loopback(),
	}
}

pub(super) fn diagnostics_url(endpoint: &str, path: &str, method: &str) -> Result<Url, String> {
	let allowed = matches!(
		(method, path),
		("GET", "/api/runtime/capabilities")
			| ("GET", "/api/snapshot")
			| ("GET", "/api/flights")
			| ("POST", "/api/flights")
			| ("POST", "/api/demos/prompt-strength")
	);
	if !allowed {
		return Err("diagnostics request is outside the native allowlist".into());
	}

	let mut url =
		Url::parse(endpoint).map_err(|error| format!("invalid runtime endpoint: {error}"))?;
	if !matches!(url.scheme(), "http" | "https")
		|| !url.username().is_empty()
		|| url.password().is_some()
		|| url.query().is_some()
		|| url.fragment().is_some()
	{
		return Err("runtime endpoint must be a credential-free HTTP(S) origin".into());
	}
	let host = url.host().ok_or_else(|| "runtime endpoint has no host".to_owned())?;
	if url.scheme() == "http" && !is_loopback(host) {
		return Err("remote diagnostics endpoints require HTTPS".into());
	}
	url.set_path(path);
	url.set_query(None);
	url.set_fragment(None);
	Ok(url)
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn diagnostics_transport_is_allowlisted_and_requires_tls_off_loopback() {
		assert!(
			diagnostics_url("http://127.0.0.1:4387", "/api/runtime/capabilities", "GET").is_ok()
		);
		assert!(diagnostics_url("https://runtime.example.com", "/api/flights", "POST").is_ok());
		assert!(diagnostics_url("http://runtime.example.com", "/api/runtime/capabilities", "GET")
			.is_err());
		assert!(diagnostics_url("http://127.0.0.1:4387", "/api/runtime/query", "GET").is_err());
	}
}
