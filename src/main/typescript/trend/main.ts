import { TrendController } from "../wcc/trend-controller";

export interface MainOptions {
	controller: TrendController;
	csrf: Record<string, string>;
}

export class Main {
	constructor(options: MainOptions) {
		//
	}
}
