import { useConfigStore } from "~/shell/stores/config";
import { featureFlags } from "~/shared/util/feature-flags";

export function getCloudEndpoints() {
	const { urlAuthBase, urlApiBase, urlApiTicketsBase } = useConfigStore.getState().settings.cloud;
	const isCustom = featureFlags.get("cloud_endpoints") === "custom";

	const defaultAuthBase = import.meta.env.VITE_CLOUD_AUTH_BASE ?? "";
	const defaultApiBase = import.meta.env.VITE_CLOUD_API_BASE ?? "";
	const defaultApiTicketsBase = import.meta.env.VITE_CLOUD_API_TICKETS_BASE ?? "";

	return {
		authBase: isCustom ? urlAuthBase : defaultAuthBase,
		apiBase: isCustom ? urlApiBase : defaultApiBase,
		ticketsBase: isCustom ? urlApiTicketsBase : defaultApiTicketsBase,
	};
}

export function getWebsiteBase() {
	const { urlWebsiteBase } = useConfigStore.getState().settings.cloud;
	const isCustom = featureFlags.get("website_base") === "custom";
	const defaultWebsiteBase = import.meta.env.VITE_Connectome_WEBSITE_BASE ?? "";

	return isCustom ? urlWebsiteBase : defaultWebsiteBase;
}
