export interface Sensor {
	id?: number;
	name: string;
	color: number;
}

export interface SensorNew {
	id: undefined;
}

export interface SensorOld {
	id: number;
}
