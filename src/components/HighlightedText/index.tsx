import { useColorScheme } from "@mantine/hooks";
import { useMemo } from "react";
import { renderHighlighting } from "~/shared/util/highlighting";
import { useConfigStore } from "~/shell/stores/config";
import { CodeLang } from "~/types";
import classes from "./style.module.scss";

export interface HighlightedTextProps {
	children: string;
	language?: CodeLang | "vyrmql";
}

export function HighlightedText({ children, language = "vyrmql" }: HighlightedTextProps) {
	const colorScheme = useColorScheme();
	const syntaxTheme = useConfigStore((state) => state.settings.appearance.syntaxTheme);

	const highlightedText = useMemo(() => {
		return renderHighlighting(children, language, colorScheme, syntaxTheme);
	}, [children, language, colorScheme, syntaxTheme]);

	return (
		<span
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Safe to use
			dangerouslySetInnerHTML={{ __html: highlightedText }}
			className={classes.textRoot}
		/>
	);
}
