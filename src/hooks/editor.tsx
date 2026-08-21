import { Compartment } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";
import { vyrmqlVersionLinter } from "~/vendor/vyrmql-editor";
import { useEffect, useMemo, useRef } from "react";
import { useDatabaseStore } from "~/stores/database";

/**
 * Returns an editor compartment used to lint the database version against the VyrmQL syntax tree
 */
export function useDatabaseVersionLinter(editor: EditorView | null) {
	const compartment = useRef(new Compartment());
	const version = useDatabaseStore((s) => s.version);

	useEffect(() => {
		editor?.dispatch({
			effects: compartment.current.reconfigure(
				version ? vyrmqlVersionLinter(version) : [],
			),
		});
	}, [editor, version]);

	return useMemo(() => compartment.current.of([]), []);
}
