import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { containerContext, playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { dialogContext } from "../dialog/context.js";
import { ErrorDialogCore, ErrorDialogDataAttrs, getErrorDialogDismissText, getErrorDialogTitleText, getErrorDialogUnexpectedText, resolveErrorDialogDescription } from "@videojs/core";
import { applyStateDataAttrs, createDialog, createTransition, selectError } from "@videojs/core/dom";
import { ContextConsumer, ContextProvider } from "@videojs/element/context";
import { translateText } from "@videojs/core/i18n";
import { SnapshotController } from "@videojs/store/html";
//#region src/ui/error-dialog/element.ts
let idCounter = 0;
function hasAuthoredContent(host) {
	return Array.from(host.childNodes).some((node) => !!node.textContent?.trim());
}
var ErrorDialogElement = class extends UIElement {
	static {
		this.tagName = "media-error-dialog";
	}
	#core = new ErrorDialogCore();
	#provider = new ContextProvider(this, { context: dialogContext });
	#popupId = `vjs-error-dialog-popup-${idCounter++}`;
	#titleId = `vjs-error-dialog-title-${idCounter++}`;
	#descriptionId = `vjs-error-dialog-desc-${idCounter++}`;
	#errorState = new PlayerController(this, playerContext, selectError);
	#i18n = new I18nController(this, i18nContext);
	#container = new ContextConsumer(this, {
		context: containerContext,
		subscribe: true
	});
	#dialog = null;
	#snapshot = null;
	#modalitySnapshot = null;
	#lastError = null;
	#lastDescription = null;
	#seenCopyParts = /* @__PURE__ */ new WeakSet();
	#authoredCopyParts = /* @__PURE__ */ new WeakSet();
	constructor() {
		super();
		this.#core.setTitleId(this.#titleId);
		this.#core.setDescriptionId(this.#descriptionId);
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#dialog = createDialog({
			transition: createTransition(),
			onOpenChange: (nextOpen) => {
				if (!nextOpen) this.#errorState.value?.dismissError();
			}
		});
		if (this.#snapshot) this.#snapshot.track(this.#dialog.input);
		else this.#snapshot = new SnapshotController(this, this.#dialog.input);
		if (this.#modalitySnapshot) this.#modalitySnapshot.track(this.#dialog.modality);
		else this.#modalitySnapshot = new SnapshotController(this, this.#dialog.modality);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#dialog?.destroy();
		this.#dialog = null;
	}
	willUpdate(_changed) {
		super.willUpdate(_changed);
		if (!this.#dialog) return;
		this.#dialog.setInteractionRoot(this.#container.value?.container ?? null);
		const errorState = this.#errorState.value;
		const hasError = Boolean(errorState?.error);
		const { active: isOpen } = this.#dialog.input.current;
		if (errorState?.error) this.#lastError = errorState.error;
		const errorForCopy = errorState?.error ?? (isOpen ? this.#lastError : null);
		this.#syncDialogCopy(errorForCopy);
		if (!hasError && !isOpen) {
			this.#lastError = null;
			this.#lastDescription = null;
		}
		if (hasError && !isOpen) this.#dialog.open();
		else if (!hasError && isOpen) this.#dialog.close();
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#dialog) return;
		const input = this.#dialog.input.current;
		this.#core.setInput(input);
		this.#core.setDocumentModal(this.#dialog.modality.current.documentModal);
		const state = this.#core.getState();
		applyStateDataAttrs(this, state, ErrorDialogDataAttrs);
		this.#provider.setValue({
			state,
			stateAttrMap: ErrorDialogDataAttrs,
			dialog: this.#dialog,
			popupId: this.#popupId,
			popupAttrs: this.#core.getPopupAttrs(state),
			close: () => this.#dialog?.close()
		});
	}
	#syncDialogCopy(error) {
		const t = this.#i18n.value;
		const title = this.querySelector("media-dialog-title");
		if (title && !this.#hasAuthoredCopy(title)) title.textContent = translateText(getErrorDialogTitleText(), t);
		const desc = this.querySelector("media-dialog-description");
		if (desc && !this.#hasAuthoredCopy(desc)) {
			const description = error ? resolveErrorDialogDescription(error) : null;
			if (description) this.#lastDescription = description;
			const copy = description ?? this.#lastDescription;
			desc.textContent = copy ? translateText(copy, t) : translateText(getErrorDialogUnexpectedText(), t);
		}
		const close = this.querySelector("media-dialog-close");
		if (close && !this.#hasAuthoredCopy(close)) close.textContent = translateText(getErrorDialogDismissText(), t);
	}
	#hasAuthoredCopy(el) {
		if (!this.#seenCopyParts.has(el)) {
			this.#seenCopyParts.add(el);
			if (hasAuthoredContent(el)) this.#authoredCopyParts.add(el);
		}
		return this.#authoredCopyParts.has(el);
	}
};
//#endregion
export { ErrorDialogElement };
