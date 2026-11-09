import { dialogContext } from "./context.js";
import { ContextPartElement } from "../context-part-element.js";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/dialog/backdrop.ts
/** Presentational backdrop that reflects its owning dialog's state. */
var DialogBackdropElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: dialogContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-dialog-backdrop";
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", "presentation");
		this.setAttribute("aria-hidden", "true");
	}
};
//#endregion
export { DialogBackdropElement };
