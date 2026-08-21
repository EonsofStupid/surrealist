import type { CompletionSource } from "@codemirror/autocomplete";
import type { Extension } from "@codemirror/state";
import { vyrmqlLanguage } from "~/vendor/vyrmql-editor";

type Resolver = () => string[] | Promise<string[]>;

/**
 * An extension used to autocomplete query variables
 *
 * @param resolver A function that returns the list of variables
 */
export const vyrmqlVariableCompletion = (resolver: Resolver): Extension => {
	const autocomplete: CompletionSource = async (context) => {
		const match = context.matchBefore(/\$\w*/i);

		if (!context.explicit && !match) {
			return null;
		}

		const resolved = await resolver();

		return {
			from: match ? match.from : context.pos,
			validFor: /\$\w+$/,
			options: resolved.map((variable) => ({
				label: `$${variable}`,
				type: "variable",
			})),
		};
	};

	return vyrmqlLanguage.data.of({ autocomplete });
};
