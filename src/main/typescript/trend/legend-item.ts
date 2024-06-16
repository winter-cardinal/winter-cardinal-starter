import { Sensor } from "../db/sensor";
import { TrendInstantValue } from "../wcc/trend/trend-instant-value";

export class LegendItem {
	public sensor: Sensor;
	public value: TrendInstantValue;

	constructor(sensor: Sensor) {
		this.sensor = sensor;
		this.value = {
			value: 0,
			time: 0
		};
	}
}
