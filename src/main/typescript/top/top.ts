import { DApplication, DDiagram } from "@wcardinal/wcardinal-ui";

export interface TopController {
	hello(): Promise<string>;
}

export interface TopOptions {
	controller: TopController;
	csrf: Record<string, string>;
}

export class Top {
	constructor(options: TopOptions) {
		// Calling app.page.top.TopComponent#hello()
		options.controller.hello().then((response) => {
			console.log(`app.page.top.TopController#hello() returned "${response}"`);
		});

		// Show a diagram
		const application = new DApplication();

		const diagram = new DDiagram({
			parent: application.stage,
			x: 0,
			y: 0,
			width: "100%",
			height: "100%"
		});

		fetch("/asset/diagram/button-group.json").then((response) => {
			response.json().then((json) => {
				diagram.set(json);
				diagram.view.fit();
			});
		});
	}
}
