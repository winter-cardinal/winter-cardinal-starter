import { FGraphicEditor } from "@wcardinal/wcardinal-geditor";
import { GraphicController } from "../wcc/graphic/graphic-controller";
import { newHeader } from "./new-header";

export interface MainOptions {
	controller: GraphicController;
	csrf: Record<string, string>;
}

export class Main extends FGraphicEditor {
	constructor(options: MainOptions) {
		super({
			controller: options.controller,
			header: newHeader("graphic-editor.label")
		});
	}
}
