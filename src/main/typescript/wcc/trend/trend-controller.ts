import { TrendInstantComponent } from "./trend-instant-component";
import { TrendSensorComponent } from "./trend-sensor-component";

export interface TrendController {
	instant: TrendInstantComponent;
	sensor: TrendSensorComponent;
}
