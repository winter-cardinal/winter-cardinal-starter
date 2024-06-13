import { UtilSvgAtlasBuilder } from "@wcardinal/wcardinal-ui";
import { MIPMAP_MODES } from "pixi.js";

export const atlas = new UtilSvgAtlasBuilder({
	width: 1024,
	ratio: 1,
	mipmap: MIPMAP_MODES.OFF
});

atlas.add(
	"new",
	24,
	24,
	`<g fill="#fff" transform="scale(0.025, 0.025) translate(0, 960)">` +
		`<path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>` +
		`</g>`
);

atlas.add(
	"reload",
	24,
	24,
	`<g fill="#fff" transform="scale(0.025, 0.025) translate(0, 960)">` +
		`<path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>` +
		`</g>`
);

atlas.add(
	"save",
	24,
	24,
	`<g fill="#fff" transform="scale(0.025, 0.025) translate(0, 960)">` +
		`<path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>` +
		`</g>`
);
