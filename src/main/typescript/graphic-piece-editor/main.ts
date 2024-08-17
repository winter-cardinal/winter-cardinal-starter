import { FGraphicEditor } from "@wcardinal/wcardinal-geditor";
import { GraphicController } from "../wcc/graphic/graphic-controller";
import { newHeader } from "../graphic-editor/new-header";

export interface MainOptions {
	controller: GraphicController;
	csrf: Record<string, string>;
}

export class Main extends FGraphicEditor {
	constructor(options: MainOptions) {
		super({
			controller: options.controller,
			header: newHeader("graphic-piece-editor.label"),
			canvas: {
				width: 300,
				height: 300
			}
		});
	}
}
