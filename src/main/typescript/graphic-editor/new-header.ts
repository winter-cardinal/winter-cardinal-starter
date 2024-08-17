import { util } from "@wcardinal/wcardinal";
import {
	DBase,
	DBaseStateSet,
	DCoordinateSize,
	DLayoutHorizontal,
	DLayoutSpace,
	DText,
	DThemeButtonAmbient,
	DThemes
} from "@wcardinal/wcardinal-ui";
import { DisplayObject } from "pixi.js";

export const newHeader = (title: string) => {
	const color = 0xffffff;
	const bgcolor = 0x53617a;
	const hpadding = 32;
	const vpadding = 8;
	const margin = 8;
	const height = 46;

	class EThemeToolFileButton extends DThemes.getClass<DThemeButtonAmbient<string>>(
		"DButtonAmbient"
	) {
		override getColor(state: DBaseStateSet): number {
			return color;
		}

		override getWidth(): DCoordinateSize {
			return this.getHeight();
		}

		override getOutlineColor(state: DBaseStateSet): number | null {
			if (state.isActive) {
				return super.getOutlineColor(state);
			}
			return color;
		}
	}
	DThemes.setClass("EButtonToolFile", EThemeToolFileButton);

	return (buttons: DisplayObject[]): DBase => {
		return new DLayoutHorizontal({
			height,
			children: [
				new DText<string>({
					width: "auto",
					height: "100%",
					padding: {
						left: hpadding,
						right: hpadding,
						top: vpadding,
						bottom: vpadding
					},
					background: {
						color: bgcolor
					},
					text: {
						value: util.messageSource.get(title),
						color,
						align: {
							horizontal: "LEFT"
						},
						style: {
							fontWeight: "bold",
							clipping: false
						}
					},
					shadow: "WEAK"
				}),
				new DLayoutSpace({
					weight: 1
				}),
				new DLayoutHorizontal({
					width: "auto",
					height: "100%",
					padding: {
						left: hpadding,
						right: hpadding,
						top: vpadding,
						bottom: vpadding
					},
					margin,
					background: {
						color: bgcolor
					},
					children: buttons,
					shadow: "WEAK"
				})
			]
		});
	};
};
