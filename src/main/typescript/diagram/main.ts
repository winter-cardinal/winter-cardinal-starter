import { DApplication, DDiagram } from "@wcardinal/wcardinal-ui";

export interface DiagramController {
	hello(): Promise<string>;
}

export interface MainOptions {
	controller: DiagramController;
	csrf: Record<string, string>;
}

export class Main {
	constructor(options: MainOptions) {
		const application = new DApplication();

		const diagram = new DDiagram({
			parent: application.stage,
			x: 0,
			y: 0,
			width: "100%",
			height: "100%"
		});

		fetch("./asset/diagram/button-group.json").then((response) => {
			response.json().then((json) => {
				diagram.set(json);
				diagram.view.fit();
			});
		});
	}
}
