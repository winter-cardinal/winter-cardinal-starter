import { DTable, DTableDataFilterObject } from "@wcardinal/wcardinal-ui";
import { Sensor } from "../db/sensor";

export class Filter implements DTableDataFilterObject<Sensor> {
	protected _word: string;
	protected _table: DTable<Sensor> | null;

	constructor() {
		this._word = "";
		this._table = null;
	}

	get word(): string {
		return this._word;
	}

	set word(word: string) {
		if (this._word !== word) {
			this._word = word;
			this.onWordChange(word);
		}
	}

	get table(): DTable<Sensor> | null {
		return this._table;
	}

	set table(table: DTable<Sensor> | null) {
		if (this._table !== table) {
			this._table = table;
			this.onWordChange(this._word);
		}
	}

	protected onWordChange(word: string): void {
		const table = this._table;
		if (table != null) {
			if (0 < word.length) {
				table.data.filter.apply();
			} else {
				table.data.filter.unapply();
			}
		}
	}

	test(row: Sensor, index: number): boolean {
		return 0 <= row.name.indexOf(this._word);
	}
}
