import { invoke, isTauri } from "@tauri-apps/api/core";

export const VYRM_DIAGNOSTICS_PROTOCOL = "vyrm-diagnostics" as const;
export const VYRM_DIAGNOSTICS_VERSION = 1 as const;
const CAPABILITY_MATURITIES = new Set(["alpha", "partial", "experimental", "planned"]);

export type CapabilityMaturity = "alpha" | "partial" | "experimental" | "planned";

export interface VyrmEngineCapability {
	id: string;
	label: string;
	category: string;
	maturity: CapabilityMaturity;
	summary: string;
	evidence: string;
	limitation: string;
}

export interface VyrmDiagnosticsHandshake {
	protocol: typeof VYRM_DIAGNOSTICS_PROTOCOL;
	version: typeof VYRM_DIAGNOSTICS_VERSION;
	developer_diagnostics: boolean;
	runners_enabled: boolean;
	providers: string[];
	replay: {
		persisted: boolean;
		restart_recoverable: boolean;
		seekable: boolean;
		reversible: boolean;
		speeds: number[];
		lenses: string[];
	};
	engine: VyrmEngineCapability[];
}

export interface VyrmFlightEvent {
	ordinal: number;
	at: number;
	elapsed_ms: number;
	stage: string;
	kind: string;
	label: string;
	detail: string;
	data?: unknown;
}

export interface VyrmFlight {
	id: string;
	cohort_id: string;
	prompt: string;
	provider: string;
	context_mode: "fresh" | "pruned" | "full";
	budget: number;
	created_at: number;
	status: "preparing" | "prepared" | "running" | "succeeded" | "failed";
	reasoning_profile: "default" | "high" | "extreme" | "ultra";
	metrics: {
		context_tokens: number;
		input_tokens?: number;
		output_tokens?: number;
		tool_calls: number;
		latency_ms?: number;
		acceptance_met?: boolean;
		cached_input_tokens?: number;
		reasoning_tokens?: number;
		provider_events: number;
	};
	events: VyrmFlightEvent[];
	demo_role?: string;
}

export interface VyrmRuntimeSnapshot {
	generated_at: number;
	instance: {
		id: string;
		mode: string;
		root: string;
	};
	health: {
		state: string;
		storage_backend: string;
		runtime_cursor: number;
		current_claims: number;
		vector_artifacts: number;
	};
	flights: VyrmFlight[];
	capabilities: VyrmDiagnosticsHandshake;
}

export interface LaunchVyrmFlight {
	prompt: string;
	provider: string;
	context_mode: "fresh" | "pruned" | "full";
	budget: number;
	acceptance_marker: string;
	reasoning_profile: "default" | "high" | "extreme" | "ultra";
}

function runtimeURL(endpoint: string, path: string) {
	const base = endpoint.endsWith("/") ? endpoint : `${endpoint}/`;
	return new URL(path.replace(/^\//, ""), base);
}

function assertHandshake(value: unknown): asserts value is VyrmDiagnosticsHandshake {
	if (!value || typeof value !== "object") {
		throw new Error("Vyrm runtime returned an invalid diagnostics handshake");
	}
	const handshake = value as Partial<VyrmDiagnosticsHandshake>;
	if (
		handshake.protocol !== VYRM_DIAGNOSTICS_PROTOCOL ||
		handshake.version !== VYRM_DIAGNOSTICS_VERSION ||
		handshake.developer_diagnostics !== true ||
		!Array.isArray(handshake.providers) ||
		!handshake.replay ||
		handshake.replay.persisted !== true ||
		handshake.replay.restart_recoverable !== true ||
		handshake.replay.seekable !== true ||
		handshake.replay.reversible !== true ||
		!Array.isArray(handshake.replay.speeds) ||
		!handshake.replay.speeds.every((speed) => typeof speed === "number" && speed > 0) ||
		!Array.isArray(handshake.replay.lenses) ||
		!Array.isArray(handshake.engine) ||
		handshake.engine.some(
			(capability) =>
				!capability ||
				typeof capability.id !== "string" ||
				typeof capability.label !== "string" ||
				!CAPABILITY_MATURITIES.has(capability.maturity),
		)
	) {
		throw new Error("Endpoint does not implement vyrm-diagnostics v1");
	}
}

function assertFlights(value: unknown): asserts value is VyrmFlight[] {
	if (
		!Array.isArray(value) ||
		value.some(
			(flight) =>
				!flight ||
				typeof flight !== "object" ||
				typeof flight.id !== "string" ||
				!Array.isArray(flight.events) ||
				flight.events.some(
					(event: Partial<VyrmFlightEvent> | null) =>
						!event ||
						typeof event.ordinal !== "number" ||
						typeof event.stage !== "string" ||
						typeof event.label !== "string",
				),
		)
	) {
		throw new Error("Vyrm runtime returned an invalid flight ledger");
	}
}

function assertSnapshot(value: unknown): asserts value is VyrmRuntimeSnapshot {
	if (!value || typeof value !== "object") {
		throw new Error("Vyrm runtime returned an invalid snapshot");
	}
	const snapshot = value as Partial<VyrmRuntimeSnapshot>;
	if (
		!snapshot.instance ||
		typeof snapshot.instance.id !== "string" ||
		!snapshot.health ||
		typeof snapshot.health.runtime_cursor !== "number" ||
		!Array.isArray(snapshot.flights)
	) {
		throw new Error("Vyrm runtime returned an invalid snapshot");
	}
	assertHandshake(snapshot.capabilities);
	assertFlights(snapshot.flights);
}

export class VyrmDiagnosticsClient {
	constructor(private readonly endpoint: string) {}

	private async request<T>(path: string, method = "GET", body?: unknown): Promise<T> {
		if (isTauri()) {
			return invoke<T>("runtime_diagnostics_request", {
				endpoint: this.endpoint,
				path,
				method,
				body,
			});
		}
		const response = await fetch(runtimeURL(this.endpoint, path), {
			method,
			headers: { Accept: "application/json", "Content-Type": "application/json" },
			body: body === undefined ? undefined : JSON.stringify(body),
		});
		const value = (await response.json()) as T;
		if (!response.ok) {
			throw new Error(`Vyrm diagnostics request failed (${response.status})`);
		}
		return value;
	}

	async handshake() {
		const value = await this.request<unknown>("/api/runtime/capabilities");
		assertHandshake(value);
		return value;
	}

	async snapshot() {
		const value = await this.request<unknown>("/api/snapshot");
		assertSnapshot(value);
		return value;
	}

	async flights() {
		const value = await this.request<unknown>("/api/flights");
		assertFlights(value);
		return value;
	}

	async launch(request: LaunchVyrmFlight) {
		return this.request<VyrmFlight>("/api/flights", "POST", request);
	}

	async seedDemos() {
		const value = await this.request<unknown>("/api/demos/prompt-strength", "POST", {});
		assertFlights(value);
		return value;
	}
}
