import { Clock } from "./clock";
import { Menu } from "./menu";

export interface MainOptions {}

export class Main {
	protected _clock: Clock;
	protected _menu: Menu;

	constructor(options: MainOptions) {
		this._clock = new Clock();
		this._menu = new Menu();
	}
}
