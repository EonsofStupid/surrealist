import { satisfies } from "compare-versions";
import { VyrmQL } from "./contract";
import { VyrmQLV2 } from "./v2";
import { VyrmQLV3 } from "./v3";

export function createVyrmQL(version: string): VyrmQL {
	return satisfies(version, ">= 3.0.0-alpha.1") ? new VyrmQLV3() : new VyrmQLV2();
}
