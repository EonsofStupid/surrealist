import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import process from "node:process";

const roots = ["src", "src-tauri", "docs"];
const files = [
	"CHANGELOG.md",
	"CONTRIBUTING.md",
	"GOVERNANCE.md",
	"README.md",
	"package.json",
	"vite.config.ts",
];
const textExtensions = new Set([
	".css",
	".html",
	".json",
	".md",
	".rs",
	".scss",
	".svg",
	".ts",
	".tsx",
]);
const retired = /vyrm(?:ql|ml)/i;

async function collect(path) {
	const entries = await readdir(path, { withFileTypes: true });
	for (const entry of entries) {
		const target = join(path, entry.name);
		if (entry.isDirectory()) {
			await collect(target);
		} else if (entry.isFile() && textExtensions.has(extname(entry.name))) {
			files.push(target);
		}
	}
}

for (const root of roots) {
	await collect(root);
}

const violations = [];
for (const file of files) {
	const path = relative(process.cwd(), file);
	const content = await readFile(file, "utf8");
	if (retired.test(path) || retired.test(content)) {
		violations.push(path);
	}
}

if (violations.length > 0) {
	console.error("Retired pre-release query identities remain:");
	for (const violation of violations.sort()) {
		console.error(`- ${violation}`);
	}
	process.exitCode = 1;
} else {
	console.log(`RRFlowQL identity gate passed across ${files.length} files.`);
}
