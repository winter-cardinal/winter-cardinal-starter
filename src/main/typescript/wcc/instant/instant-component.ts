import { controller } from "@wcardinal/wcardinal";

export interface InstantComponent extends controller.Component {
	sensors: controller.data.SClass<string[]>;
}
