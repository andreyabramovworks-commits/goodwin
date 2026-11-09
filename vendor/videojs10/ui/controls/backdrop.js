import { ContextPartElement } from "../context-part-element.js";
import { controlsContext } from "./context.js";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/controls/backdrop.ts
/** Presentational backdrop that reflects its owning controls surface's state. */
var ControlsBackdropElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: controlsContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-controls-backdrop";
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", "presentation");
		this.setAttribute("aria-hidden", "true");
	}
};
//#endregion
export { ControlsBackdropElement };
