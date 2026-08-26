export const RRFLOW_CONTROL_PROTOCOL = "rrflow-control" as const;
export const RRFLOW_CONTROL_VERSION = 1 as const;

export interface RRFlowControlHandshake {
	protocol: typeof RRFLOW_CONTROL_PROTOCOL;
	version: typeof RRFLOW_CONTROL_VERSION;
	controlPlaneId: string;
	name: string;
	region?: string;
	capabilities: string[];
}

export interface RRFlowManagedInstance {
	id: string;
	name: string;
	endpoint: string;
	project?: string;
	region?: string;
	version?: string;
	status: "online" | "degraded" | "offline" | "provisioning" | "upgrading";
	updatedAt?: string;
}

interface RRFlowInstanceList {
	instances: RRFlowManagedInstance[];
}

const INSTANCE_STATUSES = new Set<RRFlowManagedInstance["status"]>([
	"online",
	"degraded",
	"offline",
	"provisioning",
	"upgrading",
]);

function controlURL(endpoint: string, path: string): URL {
	const base = endpoint.endsWith("/") ? endpoint : `${endpoint}/`;
	return new URL(path.replace(/^\//, ""), base);
}

function assertHandshake(value: unknown): asserts value is RRFlowControlHandshake {
	if (!value || typeof value !== "object") {
		throw new Error("RRFlow control plane returned an invalid handshake");
	}

	const handshake = value as Partial<RRFlowControlHandshake>;
	if (
		handshake.protocol !== RRFLOW_CONTROL_PROTOCOL ||
		handshake.version !== RRFLOW_CONTROL_VERSION ||
		typeof handshake.controlPlaneId !== "string" ||
		typeof handshake.name !== "string" ||
		!Array.isArray(handshake.capabilities)
	) {
		throw new Error("Endpoint is not an RRFlow enterprise control plane");
	}
}

function assertInstanceList(value: unknown): asserts value is RRFlowInstanceList {
	if (!value || typeof value !== "object") {
		throw new Error("RRFlow control plane returned an invalid instance list");
	}

	const list = value as Partial<RRFlowInstanceList>;
	if (
		!Array.isArray(list.instances) ||
		list.instances.some(
			(instance) =>
				!instance ||
				typeof instance !== "object" ||
				typeof instance.id !== "string" ||
				typeof instance.name !== "string" ||
				typeof instance.endpoint !== "string" ||
				!INSTANCE_STATUSES.has(instance.status),
		)
	) {
		throw new Error("RRFlow control plane returned an invalid instance list");
	}
}

export class RRFlowControlPlaneClient {
	constructor(
		private readonly endpoint: string,
		private readonly token: string,
	) {}

	private async request<T>(path: string): Promise<T> {
		const response = await fetch(controlURL(this.endpoint, path), {
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${this.token}`,
				"RRFlow-Control-Protocol": String(RRFLOW_CONTROL_VERSION),
			},
		});

		if (!response.ok) {
			throw new Error(`RRFlow control request failed (${response.status})`);
		}

		return response.json() as Promise<T>;
	}

	async handshake(): Promise<RRFlowControlHandshake> {
		const handshake = await this.request<unknown>("/rrflow/v1/control/handshake");
		assertHandshake(handshake);
		return handshake;
	}

	async listInstances(): Promise<RRFlowManagedInstance[]> {
		const result = await this.request<unknown>("/rrflow/v1/control/instances");
		assertInstanceList(result);
		return result.instances;
	}
}
