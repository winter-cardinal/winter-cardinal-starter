export interface MenuOptions {}

export class Menu {
	protected _buttonOpen: Element;
	protected _buttonClose: Element;
	protected _blocker: Element;
	protected _menu: Element;
	protected _items: NodeListOf<Element>;
	protected _iframe: HTMLIFrameElement;
	protected _formSignOut: HTMLFormElement;
	protected _isOpened: boolean;

	constructor(options?: MenuOptions) {
		this._isOpened = false;

		const menu = document.querySelector("wcs-menu")!;
		this._menu = menu;

		const iframe = document.querySelector("iframe")!;
		this._iframe = iframe;

		const formSignOut = document.querySelector<HTMLFormElement>("#signout-form")!;
		this._formSignOut = formSignOut;

		const items = menu.querySelectorAll(".wcs-menu-item");
		this._items = items;
		items.forEach((item) => {
			item.addEventListener("click", () => {
				this.onItemClick(item);
			});
		});

		const blocker = document.querySelector("wcs-menu-blocker")!;
		this._blocker = blocker;
		blocker.addEventListener("click", () => {
			this.close();
		});

		const buttonOpen = document.querySelector(".wcs-top-header-button.menu")!;
		this._buttonOpen = buttonOpen;
		buttonOpen.addEventListener("click", () => {
			this.open();
		});

		const buttonClose = document.querySelector(".wcs-menu-button.close")!;
		this._buttonClose = buttonClose;
		buttonClose.addEventListener("click", () => {
			this.close();
		});
	}

	protected onItemClick(item: Element): void {
		const url = item.getAttribute("url");
		if (url != null) {
			if (url === "./signout") {
				this._formSignOut.submit();
			} else {
				this._iframe.src = url;
			}
		}
		this.close();
	}

	open(): void {
		if (!this._isOpened) {
			this._isOpened = true;
			this.onOpen();
		}
	}

	protected onOpen(): void {
		this._menu.classList.add("opened");
		this._blocker.classList.add("opened");
	}

	close(): void {
		if (this._isOpened) {
			this._isOpened = false;
			this.onClose();
		}
	}

	protected onClose(): void {
		this._menu.classList.remove("opened");
		this._blocker.classList.remove("opened");
	}
}
