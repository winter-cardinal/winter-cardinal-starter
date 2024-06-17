import { Sensor } from "../db/sensor";
import { InstantValue } from "../wcc/instant/instant-value";

export class LegendItem {
	public sensor: Sensor;
	public value: InstantValue;

	constructor(sensor: Sensor) {
		this.sensor = sensor;
		this.value = {
			value: 0,
			time: 0
		};
	}
}
