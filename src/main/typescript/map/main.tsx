import { createRoot } from "react-dom/client";
import { DiagramController } from "../wcc/diagram/diagram-controller";
import { Viewer } from "./viewer";
import { Control } from "./control";

export interface MainOptions {
	controller: DiagramController;
}

export class Main {
	constructor() {
		const viewerRoot = createRoot(document.body.querySelector("wcs-map-viewer")!);
		viewerRoot.render(<Viewer />);

		const controlRoot = createRoot(document.body.querySelector("wcs-map-control")!);
		controlRoot.render(<Control />);
	}
}
