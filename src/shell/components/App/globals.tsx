import type { ReactNode } from "react";
import { adapter } from "~/adapter";
import { useConnectionSwitch } from "./hooks/connection";
import { useKeybindListener, useModKeyTracker } from "./hooks/input";
import { useNativeMenuBar } from "./hooks/menu";
import { useAppRouter } from "./hooks/routing";
import { useTitleSync } from "./hooks/title";
import { useViewSync } from "./hooks/view";
import { useWindowSettings } from "./hooks/window";

export function Globals(): ReactNode {
	useModKeyTracker();
	useKeybindListener();
	useWindowSettings();
	useConnectionSwitch();
	useTitleSync();
	useViewSync();
	useAppRouter();

	// While calling hooks conditionally is usually not a good idea,
	// this is an exception since the adapter will never change.
	if (adapter.id === "desktop" && adapter.platform === "darwin") {
		// biome-ignore lint/correctness/useHookAtTopLevel: Adapters are never mutated
		useNativeMenuBar();
	}

	return;
}
