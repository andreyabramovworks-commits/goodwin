import { ContextPartElement } from "../context-part-element.js";
import { controlsContext } from "./context.js";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/controls/content.ts
/** Interactive surface that reflects its owning controls state. */
var ControlsContentElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: controlsContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-controls-content";
	}
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("data-interactive", "");
	}
};
//#endregion
export { ControlsContentElement };
