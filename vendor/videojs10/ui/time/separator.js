import { UIElement } from "../ui-element.js";
//#region src/ui/time/separator.ts
var TimeSeparatorElement = class extends UIElement {
	static {
		this.tagName = "media-time-separator";
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("aria-hidden", "true");
		if (!this.textContent?.trim()) this.textContent = "/";
	}
};
//#endregion
export { TimeSeparatorElement };
