import { util } from "@wcardinal/wcardinal";
import { NumberFormatter, NumberFormatters } from "@wcardinal/wcardinal-ui";

export interface ClockOptions {}

export class Clock {
	protected _elements: HTMLCollectionOf<Element>;
	protected _formatter: NumberFormatter;
	protected _updateBound: () => void;

	constructor(options?: ClockOptions) {
		this._elements = document.getElementsByTagName("wcs-top-header-clock");
		this._formatter = NumberFormatters.create(util.messageSource.get("top.clock.format"));
		this._updateBound = (): void => {
			this.update();
		};
		this.update();
	}

	private update(): void {
		const now = Date.now();
		const text = this._formatter.format(now, 1);
		const elements = this._elements;
		for (let i = 0, imax = elements.length; i < imax; ++i) {
			elements[i].textContent = text;
		}
		setTimeout(this._updateBound, 1000 - (now % 1000));
	}
}
