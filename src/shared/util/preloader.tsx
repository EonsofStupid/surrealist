import glowUrl2 from "~/shared/assets/images/glow.png";
import glowUrl from "~/shared/assets/images/glow.png";

function preloadImage(url: string) {
	const img = new Image();
	img.src = url;
}

export function preloadImages() {
	preloadImage(glowUrl);
	preloadImage(glowUrl2);
}
