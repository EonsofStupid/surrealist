import { useLayoutEffect } from "react";
import { adapter } from "~/adapter";
import {
	checkSessionExpiry,
	invalidateSession,
	openCloudAuthentication,
	refreshAccess,
	verifyAuthentication,
} from "~/cloud/api/auth";
import { useIntent } from "~/hooks/routing";
import { featureFlags } from "~/shared/util/feature-flags";
import { CODE_RES_KEY, STATE_RES_KEY } from "~/shared/util/storage";

/**
 * Automatically set up the cloud authentication flow
 */
export function useCloudAuthentication(enabled: boolean) {
	// Check for session expiry every 3 minutes
	useLayoutEffect(() => {
		if (!enabled) return;

		const responseCode = sessionStorage.getItem(CODE_RES_KEY);
		const responseState = sessionStorage.getItem(STATE_RES_KEY);

		// Check for configured redirect response, otherwise
		// attempt to refresh the currently active session
		if (responseCode && responseState) {
			sessionStorage.removeItem(CODE_RES_KEY);
			sessionStorage.removeItem(STATE_RES_KEY);

			verifyAuthentication(responseCode, responseState);
		} else {
			refreshAccess();
		}

		const interval = setInterval(checkSessionExpiry, 1000 * 60 * 3);

		return () => clearInterval(interval);
	}, [enabled]);

	// React to authentication intents
	useIntent("cloud-auth", (payload) => {
		if (!enabled) return;

		const { code, state } = payload;

		if (!code || !state) {
			adapter.warn("Cloud", "Invalid cloud callback payload");
			return;
		}

		verifyAuthentication(code, state);
	});

	// React to signin intents
	useIntent("cloud-signin", () => {
		if (!enabled) return;

		openCloudAuthentication();
	});

	// React to callback intents
	useIntent("cloud-signout", () => {
		if (!enabled) return;

		invalidateSession();
	});

	// React to cloud activation
	useIntent("cloud-activate", () => {
		if (!enabled) return;

		featureFlags.set("cloud_access", true);
	});
}
