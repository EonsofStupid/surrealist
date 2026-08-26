import { expect, test } from "@playwright/test";

test("renders the Connectome overview from the production bundle", async ({ page }, testInfo) => {
	const pageErrors: Error[] = [];
	page.on("pageerror", (error) => pageErrors.push(error));

	await page.goto("/", { waitUntil: "domcontentloaded" });
	// Chromium starts with its pointer at the top-left edge, which activates the
	// expandable navigation rail. Move into the content before visual evidence.
	await page.mouse.move(1279, 360);

	await expect(page).toHaveTitle("Connectome");
	await expect(page.getByText("RRFlow instances", { exact: true })).toBeVisible();
	await expect(page.getByRole("button", { name: "Connect instance" })).toBeVisible();

	await testInfo.attach("connectome-overview", {
		body: await page.screenshot({ fullPage: true }),
		contentType: "image/png",
	});

	expect(
		pageErrors,
		pageErrors.map((error) => error.stack ?? error.message).join("\n\n"),
	).toEqual([]);
});
