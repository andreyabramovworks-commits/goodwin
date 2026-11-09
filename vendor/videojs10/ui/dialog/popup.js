import { dialogContext } from "./context.js";
import { ContextPartElement } from "../context-part-element.js";
import { applyElementProps } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/dialog/popup.ts
/** Semantic popup that owns focus management and dialog transition completion. */
var DialogPopupElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: dialogContext,
			subscribe: true
		});
		this.#dialog = null;
	}
	static {
		this.tagName = "media-dialog-popup";
	}
	#dialog;
	disconnectedCallback() {
		this.#dialog?.setPopupElement(null);
		this.#dialog = null;
		super.disconnectedCallback();
	}
	update(changed) {
		super.update(changed);
		const ctx = this.consumer.value;
		if (!ctx) return;
		if (this.#dialog !== ctx.dialog) {
			this.#dialog?.setPopupElement(null);
			this.#dialog = ctx.dialog;
			this.#dialog.setPopupElement(this);
		}
		applyElementProps(this, {
			id: ctx.popupId,
			tabIndex: -1,
			...ctx.popupAttrs
		});
	}
};
//#endregion
export { DialogPopupElement };
