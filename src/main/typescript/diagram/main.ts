import {
	DApplication,
	DButton,
	DButtonAmbient,
	DDiagram,
	DLayoutHorizontal
} from "@wcardinal/wcardinal-ui";
import { util } from "@wcardinal/wcardinal";
import { atlas } from "./atlas";
import { DiagramController } from "../wcc/diagram/diagram-controller";
import { InstantValue } from "../wcc/instant/instant-value";

export interface MainOptions {
	controller: DiagramController;
	csrf: Record<string, string>;
}

export class Main {
	protected _application: DApplication;
	protected _controller: DiagramController;
	protected _diagram?: DDiagram;
	protected _layoutButtonView?: DLayoutHorizontal;
	protected _buttonViewZoomOut?: DButton<string>;
	protected _buttonViewZoomIn?: DButton<string>;
	protected _buttonViewReset?: DButton<string>;
	protected _buttonViewFit?: DButton<string>;

	constructor(options: MainOptions) {
		const application = new DApplication();
		this._application = application;

		const controller = options.controller;
		this._controller = controller;
		controller.instant.on("update", (e: unknown, values: Record<string, InstantValue>) => {
			this.onInstantUpdate(values);
		});

		const diagram = this.diagram;
		application.stage.addChild(diagram);
		application.stage.addChild(this.layoutButtonView);
	}

	protected onInstantUpdate(values: Record<string, InstantValue>): void {
		const data = this.diagram.data;
		for (const sensorName in values) {
			const value = values[sensorName];
			data.set(sensorName, value.value, value.time);
		}
		this._application.update();
	}

	protected get diagram(): DDiagram {
		return (this._diagram ??= this.newDiagram());
	}

	protected newDiagram(): DDiagram {
		const result = new DDiagram({
			x: 0,
			y: 0,
			width: "100%",
			height: "100%",
			on: {
				ready: () => {
					result.view.fit();
					this._controller.instant.sensors.set(result.data.ids);
				}
			}
		});
		fetch("./asset/diagram/plant.json").then((response) => {
			response.json().then((json) => {
				result.set(json);
			});
		});
		return result;
	}

	protected get layoutButtonView(): DLayoutHorizontal {
		return (this._layoutButtonView ??= this.newLayoutButtonView());
	}

	protected newLayoutButtonView(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			x: (p, s) => p - s - 8,
			y: (p, s) => p - s - 8,
			width: "auto",
			height: "auto",
			margin: 8,
			background: {
				color: 0xffffff
			},
			children: [
				this.buttonViewZoomOut,
				this.buttonViewZoomIn,
				this.buttonViewReset,
				this.buttonViewFit
			]
		});
	}

	protected get buttonViewZoomOut(): DButton<string> {
		return (this._buttonViewZoomOut ??= this.newButtonViewZoomOut());
	}

	protected newButtonViewZoomOut(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: atlas.mappings.zoom_out
			},
			title: util.messageSource.get("diagram.zoom-out"),
			shortcut: "Ctrl+Alt+Minus",
			on: {
				active: (): void => {
					this.diagram.view.zoomOut();
				}
			}
		});
	}

	protected get buttonViewZoomIn(): DButton<string> {
		return (this._buttonViewZoomIn ??= this.newButtonViewZoomIn());
	}

	protected newButtonViewZoomIn(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: atlas.mappings.zoom_in
			},
			title: util.messageSource.get("diagram.zoom-in"),
			shortcut: "Ctrl+Alt+Plus",
			shortcuts: ["Ctrl+Alt+;", "Ctrl+Alt+Shift+Plus"],
			on: {
				active: (): void => {
					this.diagram.view.zoomIn();
				}
			}
		});
	}

	protected get buttonViewReset(): DButton<string> {
		return (this._buttonViewReset ??= this.newButtonViewReset());
	}

	protected newButtonViewReset(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: atlas.mappings.reset_viewport
			},
			title: util.messageSource.get("diagram.reset-viewport"),
			shortcut: "Ctrl+Alt+R",
			on: {
				active: (): void => {
					this.diagram.view.reset();
				}
			}
		});
	}

	protected get buttonViewFit(): DButton<string> {
		return (this._buttonViewFit ??= this.newButtonViewFit());
	}

	protected newButtonViewFit(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: atlas.mappings.fit_viewport
			},
			title: util.messageSource.get("diagram.fit-viewport"),
			shortcut: "Ctrl+Alt+F",
			on: {
				active: (): void => {
					this.diagram.view.fit();
				}
			}
		});
	}
}
