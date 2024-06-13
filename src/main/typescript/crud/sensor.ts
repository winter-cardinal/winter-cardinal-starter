export interface Sensor {
	id?: number;
	name: string;
	value: number;
}

export interface SensorNew {
	id: undefined;
}

export interface SensorOld {
	id: number;
}
