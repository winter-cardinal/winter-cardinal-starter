import {
	DApplication,
	DButton,
	DButtonAmbient,
	DDialogConfirmDiscard,
	DDialogOpener,
	DDialogProcessing,
	DInputSearch,
	DInputText,
	DLayoutHorizontal,
	DLayoutVertical,
	DTable,
	DTableColumnOptions
} from "@wcardinal/wcardinal-ui";
import { util } from "@wcardinal/wcardinal";
import { atlas } from "./atlas";
import { CrudController } from "./crud-controller";
import { Filter } from "./filter";
import { Sensor, SensorNew, SensorOld } from "./sensor";

export interface MainOptions {
	controller: CrudController;
}

export class Main {
	protected _controller: CrudController;
	protected _application: DApplication;
	protected _isChanged: boolean;

	protected _filter?: Filter;
	protected _table?: DTable<Sensor>;
	protected _dialogProcessing?: DDialogProcessing;
	protected _dialogDiscard?: DDialogConfirmDiscard;
	protected _inputSearch?: DInputText;
	protected _buttonNew?: DButton<string>;
	protected _buttonReload?: DButton<string>;
	protected _buttonSave?: DButton<string>;

	protected _updateds: Set<Sensor>;
	protected _deleteds: Set<Sensor>;

	constructor(options: MainOptions) {
		this._controller = options.controller;
		this._isChanged = false;
		this._updateds = new Set<Sensor>();
		this._deleteds = new Set<Sensor>();

		const application = new DApplication({
			padding: 8
		});
		this._application = application;

		application.stage.addChild(
			new DLayoutVertical({
				x: "center",
				y: "center",
				width: (p, s, padding) => {
					console.log(p, s, padding);
					return Math.min(p - padding, 1200);
				},
				height: "padding",
				margin: 8,
				children: [
					new DLayoutHorizontal({
						width: "padding",
						height: "auto",
						margin: 8,
						children: [
							this.inputSearch,
							this.buttonNew,
							this.buttonReload,
							this.buttonSave
						]
					}),
					this.table
				]
			})
		);

		this.onChange();
	}

	protected get filter(): Filter {
		return (this._filter ??= this.newFilter());
	}

	protected newFilter(): Filter {
		return new Filter();
	}

	protected get table(): DTable<Sensor> {
		return (this._table ??= this.newTable());
	}

	protected newTable(): DTable<Sensor> {
		const filter = this.filter;
		const result = new DTable<Sensor>({
			weight: 1,
			width: "padding",
			columns: this.newColumnOptions(),
			data: {
				filter
			}
		});
		filter.table = result;
		this._controller.findAll().then((sensors: Sensor[]): void => {
			result.data.clearAndAddAll(sensors);
			this.toClean();
		});
		return result;
	}

	protected newColumnOptions(): Array<DTableColumnOptions<Sensor>> {
		return [
			{
				type: "TEXT",
				label: util.messageSource.get("crud.column.name"),
				editable: true,
				sortable: true,
				weight: 1,
				getter: (sensor: Sensor): string => {
					return sensor.name;
				},
				setter: (sensor: Sensor, index: number, value: string): void => {
					sensor.name = value;
					this.toSensorUpdated(sensor);
				}
			},
			{
				type: "INTEGER",
				label: util.messageSource.get("crud.column.value"),
				editable: true,
				sortable: true,
				weight: 1,
				getter: (sensor: Sensor): number => {
					return sensor.value;
				},
				setter: (sensor: Sensor, index: number, value: number): void => {
					sensor.value = value;
					this.toSensorUpdated(sensor);
				}
			},
			{
				type: "CHECK",
				label: util.messageSource.get("crud.column.delete"),
				editable: true,
				sortable: true,
				width: 100,
				header: {
					check: {
						enable: true,
						emittable: false
					}
				},
				getter: (sensor: Sensor): boolean => {
					return this.isSensorDeleted(sensor);
				},
				setter: (sensor: Sensor, index: number, value: boolean): void => {
					if (value) {
						this.toSensorDeleted(sensor);
					} else {
						this.toSensorNotDeleted(sensor);
					}
				}
			}
		];
	}

	protected get dialogProcessing(): DDialogProcessing {
		return (this._dialogProcessing ??= this.newDialogProcessing());
	}

	protected newDialogProcessing(): DDialogProcessing {
		return new DDialogProcessing();
	}

	protected get dialogDiscard(): DDialogConfirmDiscard {
		return (this._dialogDiscard ??= this.newDialogDiscard());
	}

	protected newDialogDiscard(): DDialogConfirmDiscard {
		return new DDialogConfirmDiscard();
	}

	protected get inputSearch(): DInputText {
		return (this._inputSearch ??= this.newInputSearch());
	}

	protected newInputSearch(): DInputText {
		return new DInputSearch({
			weight: 1,
			on: {
				input: (value: string): void => {
					this.filter.word = value;
				}
			}
		});
	}

	protected get buttonNew(): DButton<string> {
		return (this._buttonNew ??= this.newButtonNew());
	}

	protected newButtonNew(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: atlas.mappings.new
			},
			title: util.messageSource.get("crud.new"),
			shortcut: "Ctrl+M",
			on: {
				active: (emitter): void => {
					const sensor = this.newSensor();
					this.table.data.add(sensor);
					this.table.body.scrollTo(sensor);
					this.toDirty();
				}
			}
		});
	}

	protected get buttonReload(): DButton<string> {
		return (this._buttonReload ??= this.newButtonReload());
	}

	protected newButtonReload(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: atlas.mappings.reload
			},
			title: util.messageSource.get("crud.reload"),
			shortcut: "Ctrl+R",
			on: {
				active: (opener): void => {
					if (this._isChanged) {
						this.dialogDiscard.open(opener).then((): void => {
							this.reload(opener);
						});
					} else {
						this.reload(opener);
					}
				}
			}
		});
	}

	protected reload(opener?: DDialogOpener): void {
		const dialogProcessing = this.dialogProcessing;
		dialogProcessing.open(opener);
		this._controller.findAll().then(
			(rows: Sensor[]): void => {
				this.table.data.clearAndAddAll(rows);
				this.toClean();
				dialogProcessing.resolve();
			},
			(reason: string) => {
				dialogProcessing.reject(reason);
			}
		);
	}

	protected get buttonSave(): DButton<string> {
		return (this._buttonSave ??= this.newButtonSave());
	}

	protected newButtonSave(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: atlas.mappings.save
			},
			title: util.messageSource.get("crud.save"),
			shortcut: "Ctrl+S",
			on: {
				active: (emitter): void => {
					this.onButtonSaveActive(emitter);
				}
			}
		});
	}

	protected onButtonSaveActive(opener?: DDialogOpener): void {
		const table = this.table;
		const sensors = table.data.rows;

		// List updated / deleted sensors
		const updateds: Sensor[] = [];
		const deleteds: number[] = [];
		const ideleteds: number[] = [];
		for (let i = 0, imax = sensors.length; i < imax; ++i) {
			const sensor = sensors[i];
			if (this.isSensorDeleted(sensor)) {
				if (this.isSensorOld(sensor)) {
					deleteds.push(sensor.id);
				}
				ideleteds.push(i);
			} else if (this.isSensorNew(sensor) || this.isSensorUpdated(sensor)) {
				updateds.push(sensor);
			}
		}

		// Save
		const dialogProcessing = this.dialogProcessing;
		dialogProcessing.open(opener);
		if (0 < updateds.length || 0 < deleteds.length) {
			this._controller.saveAll(updateds, deleteds).then(
				(ids: number[]): void => {
					table.body.lock();
					for (let i = 0, imax = updateds.length; i < imax; ++i) {
						updateds[i].id = ids[i];
					}
					for (let i = ideleteds.length - 1; 0 <= i; --i) {
						table.data.remove(ideleteds[i]);
					}
					table.body.update(true);
					table.body.unlock(true);
					this.toClean();
					dialogProcessing.resolve();
				},
				(reason: string): void => {
					dialogProcessing.reject(reason);
				}
			);
		} else if (0 < ideleteds.length) {
			table.body.lock();
			for (let i = ideleteds.length - 1; 0 <= i; --i) {
				table.data.remove(ideleteds[i]);
			}
			table.body.update(true);
			table.body.unlock(true);
			this.toClean();
			dialogProcessing.resolve();
		} else {
			this.toClean();
			dialogProcessing.resolve();
		}
	}

	protected toClean(): void {
		this._updateds.clear();
		this._deleteds.clear();
		if (this._isChanged) {
			this._isChanged = false;
			this.onChange();
		}
	}

	protected toDirty(): void {
		if (!this._isChanged) {
			this._isChanged = true;
			this.onChange();
		}
	}

	protected onChange(): void {
		this.buttonSave.state.isEnabled = this._isChanged;
	}

	protected newSensor(): Sensor {
		return {
			id: undefined,
			name: this.newSensorName(),
			value: 0
		};
	}

	protected newSensorName(): string {
		let index = 0;
		while (true) {
			const candidate = `Sensor${++index}`;
			if (this.hasSensorName(candidate)) {
				return candidate;
			}
		}
	}

	protected hasSensorName(name: string): boolean {
		let result = true;
		this.table.data.each((sensor: Sensor): boolean | undefined => {
			if (sensor.name === name) {
				result = false;
				return false;
			}
		});
		return result;
	}

	protected isSensorNew(sensor: SensorNew | SensorOld): sensor is SensorNew {
		return sensor.id == null;
	}

	protected isSensorOld(sensor: SensorNew | SensorOld): sensor is SensorOld {
		return !this.isSensorNew(sensor);
	}

	protected isSensorUpdated(sensor: Sensor): boolean {
		return this._updateds.has(sensor);
	}

	protected toSensorUpdated(sensor: Sensor): void {
		this._updateds.add(sensor);
		this.toDirty();
	}

	protected isSensorDeleted(row: Sensor): boolean {
		return this._deleteds.has(row);
	}

	protected toSensorDeleted(row: Sensor): void {
		const deleteds = this._deleteds;
		if (!deleteds.has(row)) {
			deleteds.add(row);
			this.toDirty();
		}
	}

	protected toSensorNotDeleted(row: Sensor): void {
		const deleteds = this._deleteds;
		if (deleteds.has(row)) {
			deleteds.delete(row);
			this.toDirty();
		}
	}
}
