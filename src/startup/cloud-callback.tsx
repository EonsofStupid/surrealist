import "@mantine/core/styles.layer.css";
import "@surrealdb/ui/styles.css";

import "~/shared/assets/styles/override.scss";
import "~/shared/assets/styles/variants.scss";
import "~/shared/assets/styles/global.scss";

import { createRoot } from "react-dom/client";
import { AuthCallbackScreen } from "~/screens/auth-callback";
import { HeadInjector } from "~/shared/util/head";

(async () => {
	const root = document.querySelector("#root");

	if (!root) {
		throw new Error("Root element not found");
	}

	createRoot(root).render(
		<>
			<HeadInjector />
			<AuthCallbackScreen />
		</>,
	);
})();
