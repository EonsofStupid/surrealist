/**
 * Temporary package boundary for the RRFlow client protocol.
 *
 * Application code imports only this RRFlow-named surface. The temporary
 * protocol package behind it can be replaced by the native RRFlow client without
 * touching feature code.
 */
export * from "@rrflow/client";
export { Surreal as RRFlow } from "@rrflow/client";
export { surql as vyrmql } from "@rrflow/client";
