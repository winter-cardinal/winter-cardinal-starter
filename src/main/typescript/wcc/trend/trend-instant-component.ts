import { controller } from "@wcardinal/wcardinal";

export interface TrendInstantComponent extends controller.Component {
	sensors: controller.data.SClass<string[]>;
}
