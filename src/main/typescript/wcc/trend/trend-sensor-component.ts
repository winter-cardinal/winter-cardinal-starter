import { Sensor } from "../../db/sensor";

export interface TrendSensorComponent {
	findAll(): Promise<Sensor[]>;
}
