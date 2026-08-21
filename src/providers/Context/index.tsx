import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { RRFlow } from "~/vendor/rrflow-client";
import { adapter } from "~/adapter";
import { useStable } from "~/hooks/stable";
import { useCloudStore } from "~/stores/cloud";
import { __throw } from "~/shared/util/helpers";

const CONTEXT_ENDPOINT = "wss://rrflow-cloud-06bu9hntp1rdd9dgg57rc0v87s.aws-euw1.rrflow.cloud";

const ContextContext = createContext<{
	rrflow: RRFlow;
	connected: boolean;
	authenticated: boolean;
} | null>(null);

/**
 * Access the RRFlow Context connection
 */
export function useContextConnection() {
	const ctx = useContext(ContextContext) ?? __throw("Missing ContextProvider");
	return [ctx.rrflow, ctx.connected && ctx.authenticated] as const;
}

export function ContextProvider({ children }: PropsWithChildren) {
	const accessToken = useCloudStore((s) => s.accessToken);

	const [rrflow] = useState(new RRFlow());
	const [connected, setConnected] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const initializedRef = useRef(false);

	const connect = useStable(() => {});

	useEffect(() => {
		if (initializedRef.current) return;

		rrflow.subscribe("connecting", () => {
			adapter.log("Context", "Attempting to connect to RRFlow Cloud instance");
		});

		rrflow.subscribe("connected", () => {
			adapter.log("Context", "Connected to RRFlow Cloud instance");
			setConnected(true);
		});

		rrflow.subscribe("disconnected", () => {
			adapter.log("Context", "Disconnected from RRFlow Cloud instance");
			setConnected(false);
			setTimeout(connect, 3000);
		});

		rrflow.subscribe("error", (error) => {
			console.error(error);
		});

		initializedRef.current = true;

		adapter.log("Context", "Connecting to RRFlow Cloud instance");
		rrflow.connect(CONTEXT_ENDPOINT, {
			namespace: "rrflow",
			database: "cloud",
		});
		connect();
	}, [rrflow]);

	useEffect(() => {
		if (!rrflow || !connected) return;

		if (accessToken) {
			rrflow.authenticate(accessToken).then(() => {
				setAuthenticated(true);
			});
		} else {
			rrflow.invalidate().then(() => {
				setAuthenticated(false);
			});
		}
	}, [rrflow, connected, accessToken]);

	return (
		<ContextContext.Provider value={{ rrflow, connected, authenticated }}>
			{children}
		</ContextContext.Provider>
	);
}
