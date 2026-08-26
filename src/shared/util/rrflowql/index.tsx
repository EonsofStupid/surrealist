import { satisfies } from "compare-versions";
import { RRFlowQL } from "./contract";
import { RRFlowQLV2 } from "./v2";
import { RRFlowQLV3 } from "./v3";

export function createRRFlowQL(version: string): RRFlowQL {
	return satisfies(version, ">= 3.0.0-alpha.1") ? new RRFlowQLV3() : new RRFlowQLV2();
}
