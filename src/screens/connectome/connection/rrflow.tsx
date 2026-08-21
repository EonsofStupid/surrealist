import { createWasmWorkerEngines } from "@rrflow/wasm";
import WasmWorker from "@rrflow/wasm/worker?worker";
import { applyDiagnostics, createRemoteEngines, RRFlow } from "~/vendor/rrflow-client";
import { useDatabaseStore } from "~/stores/database";
import { getSetting } from "~/shared/util/config";

/**
 * Create a new configured RRFlow instance
 */
export async function createRRFlow() {
	const { pushDiagnostic } = useDatabaseStore.getState();
	const maxSize = getSetting("behavior", "diagnosticsHistorySize");

	const engines = {
		...createRemoteEngines(),
		...createWasmWorkerEngines({
			createWorker: () => new WasmWorker({ name: "Connectome-wasm" }),
			capabilities: {
				experimental: true,
				functions: true,
				guest_access: true,
				live_query_notifications: true,
				network_targets: true,
			},
		}),
	};

	return new RRFlow({
		engines: applyDiagnostics(engines, (diagnostic) => {
			if (getSetting("behavior", "recordDiagnostics")) {
				pushDiagnostic(diagnostic, maxSize);
			}
		}),
	});
}
