import { Sensor } from "../db/sensor";

export interface SensorController {
	findAll(): Promise<Sensor[]>;
	saveAll(updateds: Sensor[], deleteds: number[]): Promise<number[]>;
}
