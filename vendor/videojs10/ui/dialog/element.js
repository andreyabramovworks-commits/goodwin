import { containerContext } from "../../player/context.js";
import { UIElement } from "../ui-element.js";
import { PositionController } from "../position-controller.js";
import { dialogContext } from "./context.js";
import { DialogCore, DialogDataAttrs } from "@videojs/core";
import { applyElementProps, applyStateDataAttrs, createDialog, createTransition } from "@videojs/core/dom";
import { ContextConsumer, ContextProvider } from "@videojs/element/context";
import { SnapshotController } from "@videojs/store/html";
//#region src/ui/dialog/element.ts
let idCounter = 0;
var DialogElementBase = class extends UIElement {
	static {
		this.properties = {
			open: { type: Boolean },
			defaultOpen: {
				type: Boolean,
				attribute: "default-open"
			},
			closeOnEscape: {
				type: Boolean,
				attribute: "close-on-escape"
			}
		};
	}
	#core;
	#stateAttrMap;
	#provider;
	#position;
	#container;
	#popupId;
	#titleId;
	#descriptionId;
	#bindTrigger;
	#dialog;
	#snapshot;
	#modalitySnapshot;
	#triggerAbort;
	#triggerElement;
	constructor({ core = new DialogCore(), stateAttrMap = DialogDataAttrs, idPrefix = "dialog", bindTrigger = true } = {}) {
		super();
		this.open = DialogCore.defaultProps.open;
		this.defaultOpen = DialogCore.defaultProps.defaultOpen;
		this.closeOnEscape = DialogCore.defaultProps.closeOnEscape;
		this.#provider = new ContextProvider(this, { context: dialogContext });
		this.#position = new PositionController(this);
		this.#container = new ContextConsumer(this, {
			context: containerContext,
			subscribe: true
		});
		this.#dialog = null;
		this.#snapshot = null;
		this.#modalitySnapshot = null;
		this.#triggerAbort = null;
		this.#triggerElement = null;
		this.#core = core;
		this.#stateAttrMap = stateAttrMap;
		this.#bindTrigger = bindTrigger;
		this.#popupId = `vjs-${idPrefix}-popup-${idCounter++}`;
		this.#titleId = `vjs-${idPrefix}-title-${idCounter++}`;
		this.#descriptionId = `vjs-${idPrefix}-desc-${idCounter++}`;
		this.#core.setTitleId(this.#titleId);
		this.#core.setDescriptionId(this.#descriptionId);
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#dialog = createDialog({
			transition: createTransition(),
			closeOnEscape: () => this.closeOnEscape,
			onOpenChange: (nextOpen) => {
				this.open = nextOpen;
				this.dispatchEvent(new CustomEvent("open-change", { detail: { open: nextOpen } }));
			},
			onOpenChangeComplete: (nextOpen) => {
				this.dispatchEvent(new CustomEvent("open-change-complete", { detail: { open: nextOpen } }));
			}
		});
		if (this.#snapshot) this.#snapshot.track(this.#dialog.input);
		else this.#snapshot = new SnapshotController(this, this.#dialog.input);
		if (this.#modalitySnapshot) this.#modalitySnapshot.track(this.#dialog.modality);
		else this.#modalitySnapshot = new SnapshotController(this, this.#dialog.modality);
	}
	firstUpdated(changed) {
		super.firstUpdated(changed);
		if (this.defaultOpen && !this.open) this.#dialog?.open();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#cleanupTrigger();
		this.#dialog?.destroy();
		this.#dialog = null;
	}
	close() {
		this.#dialog?.close();
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.#core.setProps(this);
		this.#dialog?.setInteractionRoot(this.#container.value?.container ?? null);
		if (this.#dialog && changed.has("open")) {
			const { active: inputOpen } = this.#dialog.input.current;
			if (this.open !== inputOpen) {
				if (this.open) this.#dialog.open();
				else this.#dialog.close();
			}
		}
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#dialog) return;
		const triggerElement = this.#bindTrigger ? this.#position.findTrigger() : null;
		this.#syncTrigger(triggerElement);
		const input = this.#dialog.input.current;
		this.#core.setInput(input);
		this.#core.setDocumentModal(this.#dialog.modality.current.documentModal);
		const state = this.#core.getState();
		applyStateDataAttrs(this, state, this.#stateAttrMap);
		if (this.#triggerElement) applyElementProps(this.#triggerElement, this.#core.getTriggerAttrs(state, this.#popupId));
		this.#provider.setValue({
			state,
			stateAttrMap: this.#stateAttrMap,
			dialog: this.#dialog,
			popupId: this.#popupId,
			popupAttrs: this.#core.getPopupAttrs(state),
			close: () => this.#dialog?.close()
		});
	}
	#syncTrigger(triggerElement) {
		if (triggerElement === this.#triggerElement) return;
		this.#cleanupTrigger();
		this.#triggerElement = triggerElement;
		this.#dialog?.setTriggerElement(triggerElement);
		if (triggerElement && this.#dialog) {
			this.#triggerAbort = new AbortController();
			applyElementProps(triggerElement, this.#dialog.triggerProps, { signal: this.#triggerAbort.signal });
		}
	}
	#cleanupTrigger() {
		if (this.#triggerElement) applyElementProps(this.#triggerElement, {
			"aria-expanded": void 0,
			"aria-haspopup": void 0,
			"aria-controls": void 0
		});
		this.#triggerAbort?.abort();
		this.#triggerAbort = null;
		this.#triggerElement = null;
		this.#dialog?.setTriggerElement(null);
	}
};
var DialogElement = class extends DialogElementBase {
	static {
		this.tagName = "media-dialog";
	}
};
//#endregion
export { DialogElement, DialogElementBase };
