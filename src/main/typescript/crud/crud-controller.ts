import { Sensor } from "./sensor";

export interface CrudController {
	findAll(): Promise<Sensor[]>;
	saveAll(updateds: Sensor[], deleteds: number[]): Promise<number[]>;
}
