import { InstantComponent } from "../instant/instant-component";
import { SensorComponent } from "../sensor/sensor-component";

export interface TrendController {
	instant: InstantComponent;
	sensor: SensorComponent;
}
