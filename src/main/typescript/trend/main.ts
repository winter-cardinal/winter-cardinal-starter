import {
	DApplication,
	DBaseState,
	DButton,
	DButtonAmbient,
	DButtonGroup,
	DChart,
	DChartAxisXDatetime,
	DChartAxisY,
	DChartCoordinateLinear,
	DChartSeriesLine,
	DLayoutHorizontal,
	DTable
} from "@wcardinal/wcardinal-ui";
import { TrendController } from "../wcc/trend/trend-controller";
import { TrendInstantValue } from "../wcc/trend/trend-instant-value";
import { LegendItem } from "./legend-item";
import { atlas } from "./atlas";
import { util } from "@wcardinal/wcardinal";

export interface MainOptions {
	controller: TrendController;
	csrf: Record<string, string>;
}

export class Main {
	protected _isPlaying: boolean;
	protected _sensorNameToLine: Map<string, DChartSeriesLine>;
	protected _sensorNameToLegendItem: Map<string, LegendItem>;
	protected _sensorNameToPoints: Map<string, number[]>;
	protected _pointsCapacity: number;

	protected _application: DApplication;
	protected _controller: TrendController;
	protected _chart?: DChart;
	protected _legend?: DTable<LegendItem>;

	protected _layoutButtonControl?: DLayoutHorizontal;
	protected _buttonControlGroup?: DButtonGroup;
	protected _buttonControlPlay?: DButton<string>;
	protected _buttonControlPause?: DButton<string>;

	protected _layoutButtonView?: DLayoutHorizontal;
	protected _buttonViewZoomOut?: DButton<string>;
	protected _buttonViewZoomIn?: DButton<string>;
	protected _buttonViewReset?: DButton<string>;
	protected _buttonViewFit?: DButton<string>;

	constructor(options: MainOptions) {
		this._isPlaying = true;
		this._sensorNameToLine = new Map<string, DChartSeriesLine>();
		this._sensorNameToLegendItem = new Map<string, LegendItem>();
		this._sensorNameToPoints = new Map<string, number[]>();
		this._pointsCapacity = 512;

		const application = new DApplication({
			padding: 8
		});
		this._application = application;

		application.stage.addChild(this.chart);

		const controller = options.controller;
		this._controller = controller;
		controller.sensor.findAll().then((sensors) => {
			const chart = this.chart;
			const plotArea = chart.plotArea;
			const series = plotArea.series;
			const legend = this.legend;

			const sensorNames: string[] = [];
			const sensorNameToLine = this._sensorNameToLine;
			const legendItems: LegendItem[] = [];
			const sensorNameToLegendItem = this._sensorNameToLegendItem;
			sensors.forEach((sensor) => {
				const sensorName = sensor.name;
				const line = new DChartSeriesLine<DChart>();
				sensorNames.push(sensorName);
				sensorNameToLine.set(sensorName, line);
				series.add(line);
				const legendItem = new LegendItem(sensor);
				legendItems.push(legendItem);
				sensorNameToLegendItem.set(sensorName, legendItem);
			});
			series.update();

			legend.data.clearAndAddAll(legendItems);

			controller.instant.sensors.set(sensorNames);
			controller.instant.on(
				"update",
				(e: unknown, values: Record<string, TrendInstantValue>) => {
					this.onInstantUpdate(values);
				}
			);
		});
	}

	protected onInstantUpdate(values: Record<string, TrendInstantValue>): void {
		const pointsCapacity = this._pointsCapacity;
		if (this._isPlaying) {
			let isChartDirty = false;
			let isLegendDirty = false;

			const sensorNameToLine = this._sensorNameToLine;
			const sensorNameToLegendItem = this._sensorNameToLegendItem;
			for (const sensorName in values) {
				const value = values[sensorName];
				const line = sensorNameToLine.get(sensorName);
				if (line != null) {
					const points = line.points;
					points.push(value.time, value.value);
					if (pointsCapacity < points.length) {
						points.shift();
						points.shift();
					}
					line.toDirty();
					isChartDirty = true;
				}

				const legendItem = sensorNameToLegendItem.get(sensorName);
				if (legendItem != null) {
					legendItem.value = value;
					isLegendDirty = true;
				}
			}

			if (isChartDirty) {
				const plotArea = this.chart.plotArea;
				plotArea.coordinate.fit();
				plotArea.axis.update();
				plotArea.series.update();
			}

			if (isLegendDirty) {
				this.legend.data.update(true);
			}
		} else {
			const sensorNameToPoints = this._sensorNameToPoints;
			for (const sensorName in values) {
				const value = values[sensorName];
				const points = sensorNameToPoints.get(sensorName);
				if (points == null) {
					sensorNameToPoints.set(sensorName, [value.time, value.value]);
				} else {
					points.push(value.time, value.value);
					if (pointsCapacity < points.length) {
						points.shift();
						points.shift();
					}
				}
			}
		}
	}

	protected get chart(): DChart {
		return (this._chart ??= this.newChart());
	}

	protected newChart(): DChart {
		return new DChart({
			x: "padding",
			y: "padding",
			width: "padding",
			height: "padding",
			padding: {
				top: 0,
				right: 408,
				bottom: 110,
				left: 60
			},
			plotArea: {
				background: {
					color: 0xffffff
				},
				coordinate: {
					x: new DChartCoordinateLinear(),
					y: new DChartCoordinateLinear({
						from: -2,
						to: 2
					})
				},
				series: {
					list: []
				},
				axis: {
					list: [new DChartAxisXDatetime(), new DChartAxisY()]
				}
			},
			children: [this.layoutButtonControl, this.layoutButtonView, this.legend]
		});
	}

	protected get legend(): DTable<LegendItem> {
		return (this._legend ??= this.newLegend());
	}

	protected newLegend(): DTable<LegendItem> {
		return new DTable<LegendItem>({
			x: (p, s) => p - s,
			y: 0,
			width: 400,
			height: (p) => p - 110,
			columns: [
				{
					type: "TEXT",
					label: "Sensor",
					editable: false,
					sortable: true,
					getter: (item) => {
						return item.sensor.name;
					}
				},
				{
					type: "COLOR",
					label: "Color",
					align: "CENTER",
					editable: false,
					sortable: true,
					width: 75,
					getter: (item) => {
						return item.sensor.color;
					},
					formatter: (value) => {
						return "";
					}
				},
				{
					type: "REAL",
					label: "Value",
					editable: false,
					sortable: true,
					width: 100,
					getter: (item: LegendItem): number => {
						return item.value.value;
					},
					formatter: (value: number): string => {
						return value.toFixed(3);
					}
				}
			]
		});
	}

	protected get layoutButtonControl(): DLayoutHorizontal {
		return (this._layoutButtonControl ??= this.newLayoutButtonControl());
	}

	protected newLayoutButtonControl(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			x: (p, s) => 60 + (p - 60 - 408 - s) * 0.5,
			y: (p, s) => p - s,
			width: "auto",
			height: "auto",
			margin: 0,
			corner: {
				adjust: true
			},
			children: [this.buttonControlPlay, this.buttonControlPause]
		});
	}

	protected get buttonControlGroup(): DButtonGroup {
		return (this._buttonControlGroup ??= new DButtonGroup());
	}

	protected get buttonControlPlay(): DButton<string> {
		return (this._buttonControlPlay ??= this.newButtonControlPlay());
	}

	protected newButtonControlPlay(): DButton<string> {
		return new DButton<string>({
			width: 60,
			height: 60,
			image: {
				source: atlas.mappings.play
			},
			toggle: true,
			group: this.buttonControlGroup,
			state: DBaseState.ACTIVE,
			title: util.messageSource.get("trend.play"),
			on: {
				active: (): void => {
					if (!this._isPlaying) {
						this._isPlaying = true;
						this.onStart();
					}
				}
			}
		});
	}

	protected onStart(): void {
		let isChartDirty = false;
		let isLegendDirty = false;

		const pointsCapacity = this._pointsCapacity;
		const sensorNameToPoints = this._sensorNameToPoints;
		const sensorNameToLegendItem = this._sensorNameToLegendItem;
		this._sensorNameToLine.forEach((line, sensorName): void => {
			const points = sensorNameToPoints.get(sensorName);
			if (points != null) {
				const pointsLength = points.length;
				const linePoints = line.points;
				for (let i = 0; i < pointsLength; i += 2) {
					linePoints.push(points[i], points[i + 1]);
					if (pointsCapacity < points.length) {
						points.shift();
						points.shift();
					}
				}
				line.toDirty();
				isChartDirty = true;

				const legendItem = sensorNameToLegendItem.get(sensorName);
				if (legendItem != null) {
					legendItem.value = {
						value: points[pointsLength - 1],
						time: points[pointsLength - 2]
					};
					isLegendDirty = true;
				}
			}
		});
		sensorNameToPoints.clear();

		if (isChartDirty) {
			const plotArea = this.chart.plotArea;
			plotArea.coordinate.fit();
			plotArea.axis.update();
			plotArea.series.update();
		}

		if (isLegendDirty) {
			this.legend.data.update(true);
		}
	}

	protected get buttonControlPause(): DButton<string> {
		return (this._buttonControlPause ??= this.newButtonControlPause());
	}

	protected newButtonControlPause(): DButton<string> {
		return new DButton<string>({
			width: 60,
			height: 60,
			image: {
				source: atlas.mappings.pause
			},
			toggle: true,
			group: this.buttonControlGroup,
			title: util.messageSource.get("trend.pause"),
			on: {
				active: (): void => {
					if (this._isPlaying) {
						this._isPlaying = false;
						this.onPause();
					}
				}
			}
		});
	}

	protected onPause(): void {
		//
	}

	protected get layoutButtonView(): DLayoutHorizontal {
		return (this._layoutButtonView ??= this.newLayoutButtonView());
	}

	protected newLayoutButtonView(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			x: (p, s) => p - s,
			y: (p, s) => p - s,
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
			title: util.messageSource.get("trend.zoom-out"),
			shortcut: "Ctrl+Alt+Minus",
			on: {
				active: (): void => {
					this.chart.plotArea.view.zoomOut();
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
			title: util.messageSource.get("trend.zoom-in"),
			shortcut: "Ctrl+Alt+Plus",
			shortcuts: ["Ctrl+Alt+;", "Ctrl+Alt+Shift+Plus"],
			on: {
				active: (): void => {
					this.chart.plotArea.view.zoomIn();
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
			title: util.messageSource.get("trend.reset-viewport"),
			shortcut: "Ctrl+Alt+R",
			on: {
				active: (): void => {
					this.chart.plotArea.view.reset();
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
			title: util.messageSource.get("trend.fit-viewport"),
			shortcut: "Ctrl+Alt+F",
			on: {
				active: (): void => {
					this.chart.plotArea.view.fit();
				}
			}
		});
	}
}
