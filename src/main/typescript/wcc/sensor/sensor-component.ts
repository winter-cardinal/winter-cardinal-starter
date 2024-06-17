import { Sensor } from "../../db/sensor";

export interface SensorComponent {
	findAll(): Promise<Sensor[]>;
	saveAll(updateds: Sensor[], deleteds: number[]): Promise<number[]>;
}
