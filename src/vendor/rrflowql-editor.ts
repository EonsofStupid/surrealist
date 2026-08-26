/**
 * RRFlowQL editor adapter backed by the attributed SurrealDB CodeMirror
 * implementation until RRFlow's native parser exposes the browser extension.
 */
export {
	surrealql as rrflowql,
	surrealqlLanguage as rrflowqlLanguage,
	surrealqlVersionLinter as rrflowqlVersionLinter,
} from "@surrealdb/codemirror";
