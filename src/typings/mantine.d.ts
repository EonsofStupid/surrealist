import type { DefaultMantineColor, Tuple } from "@mantine/core";

type ExtendedCustomColors = "rrflow" | "obsidian" | DefaultMantineColor;

declare module "@mantine/core" {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
	}
}
