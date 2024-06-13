import { UtilSvgAtlasBuilder } from "@wcardinal/wcardinal-ui";
import { MIPMAP_MODES } from "pixi.js";

export const atlas = new UtilSvgAtlasBuilder({
	width: 1024,
	ratio: 1,
	mipmap: MIPMAP_MODES.OFF
});

atlas.add(
	"zoom_out",
	24,
	24,
	`<g fill="#fff" transform="scale(0.025, 0.025) translate(0, 960)">` +
		`<path d="M200-440v-80h560v80H200Z" />` +
		`</g>`
);

atlas.add(
	"zoom_in",
	24,
	24,
	`<g fill="#fff" transform="scale(0.025, 0.025) translate(0, 960)">` +
		`<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>` +
		`</g>`
);

atlas.add(
	"reset_viewport",
	24,
	24,
	`<g fill="#fff" transform="scale(0.025, 0.025) translate(0, 960)">` +
		`<path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/>` +
		`</g>`
);

atlas.add(
	"fit_viewport",
	24,
	24,
	`<g fill="#fff" transform="scale(0.025, 0.025) translate(0, 960)">` +
		`<path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/>` +
		`</g>`
);
