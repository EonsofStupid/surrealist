import { MigrationKind } from "~/types";

export const kindMeta: Record<
	MigrationKind,
	{
		label: string;
		documentationUrl: string;
	}
> = {
	"incompatible future": {
		label: "Incompatible future",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"stored closure": {
		label: "Stored closure",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"all idiom": {
		label: "All idiom",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"field idiom followed": {
		label: "Field idiom followed",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"function logical_and": {
		label: "Function array::logical_and",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"function logical_or": {
		label: "Function array::logical_or",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"function math::sqrt": {
		label: "Function math::sqrt()",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"function math::min": {
		label: "Function math::min()",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"function math::max": {
		label: "Function math::max()",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"mock value": {
		label: "Mock value",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"number key ordering": {
		label: "Number key ordering",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"id field": {
		label: "ID field",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"search index": {
		label: "Search index",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"analyze statement": {
		label: "Analyze statement",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"record references": {
		label: "Record references",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"like operator": {
		label: "Like operator removal",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
	"mtree index": {
		label: "Mtree index removal",
		documentationUrl:
			"https://github.com/EonsofStupid/connectome",
	},
};
