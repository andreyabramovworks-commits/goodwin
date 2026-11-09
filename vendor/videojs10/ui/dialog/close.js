import { UIElement } from "../ui-element.js";
import { dialogContext } from "./context.js";
import { applyElementProps, applyStateDataAttrs, createButton } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/dialog/close.ts
/** Button that closes its owning dialog; the element itself takes `role="button"` and keyboard focus. */
var DialogCloseElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.disabled = false;
		this.#ctx = new ContextConsumer(this, {
			context: dialogContext,
			subscribe: true
		});
		this.#disconnect = null;
	}
	static {
		this.tagName = "media-dialog-close";
	}
	static {
		this.properties = { disabled: { type: Boolean } };
	}
	#ctx;
	#disconnect;
	connectedCallback() {
		super.connectedCallback();
		this.#disconnect = new AbortController();
		const buttonProps = createButton({
			onActivate: () => this.#ctx.value?.close(),
			isDisabled: () => this.disabled
		});
		applyElementProps(this, buttonProps, { signal: this.#disconnect.signal });
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	update(_changed) {
		super.update(_changed);
		const ctx = this.#ctx.value;
		if (ctx) applyStateDataAttrs(this, ctx.state, ctx.stateAttrMap);
	}
};
//#endregion
export { DialogCloseElement };
