import { satisfies } from "compare-versions";
import { rroQL } from "./surrealql";
import { rroQLV2 } from "./v2";
import { rroQLV3 } from "./v3";

export function createRroQL(version: string): rroQL {
	return satisfies(version, ">= 3.0.0-alpha.1") ? new rroQLV3() : new rroQLV2();
}
