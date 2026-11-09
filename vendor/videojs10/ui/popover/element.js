import { containerContext } from "../../player/context.js";
import { UIElement } from "../ui-element.js";
import { PositionController } from "../position-controller.js";
import { popupGroupContext } from "../../player/popup-group-context.js";
import { POPUP_HOST_ATTR, PopoverCore, PopoverDataAttrs } from "@videojs/core";
import { applyElementProps, applyStateDataAttrs, createPopover, createTransition } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
import { tryHidePopover, tryShowPopover } from "@videojs/utils/dom";
import { SnapshotController } from "@videojs/store/html";
//#region src/ui/popover/element.ts
/** @fires open-change - Fired when the popover's open state changes. */
var PopoverElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.open = PopoverCore.defaultProps.open;
		this.defaultOpen = PopoverCore.defaultProps.defaultOpen;
		this.side = PopoverCore.defaultProps.side;
		this.align = PopoverCore.defaultProps.align;
		this.modal = PopoverCore.defaultProps.modal;
		this.closeOnEscape = PopoverCore.defaultProps.closeOnEscape;
		this.closeOnOutsideClick = PopoverCore.defaultProps.closeOnOutsideClick;
		this.openOnHover = PopoverCore.defaultProps.openOnHover;
		this.delay = PopoverCore.defaultProps.delay;
		this.closeDelay = PopoverCore.defaultProps.closeDelay;
		this.boundary = "container";
		this.#core = new PopoverCore();
		this.#containerCtx = new ContextConsumer(this, {
			context: containerContext,
			subscribe: true
		});
		this.#popupGroupCtx = new ContextConsumer(this, { context: popupGroupContext });
		this.#position = new PositionController(this);
		this.#popover = null;
		this.#snapshot = null;
		this.#disconnect = null;
		this.#triggerAbort = null;
		this.#currentTrigger = null;
	}
	static {
		this.tagName = "media-popover";
	}
	static {
		this.properties = {
			open: { type: Boolean },
			defaultOpen: {
				type: Boolean,
				attribute: "default-open"
			},
			side: { type: String },
			align: { type: String },
			modal: { type: Boolean },
			closeOnEscape: {
				type: Boolean,
				attribute: "close-on-escape"
			},
			closeOnOutsideClick: {
				type: Boolean,
				attribute: "close-on-outside-click"
			},
			openOnHover: {
				type: Boolean,
				attribute: "open-on-hover"
			},
			delay: { type: Number },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			},
			boundary: { type: String }
		};
	}
	#core;
	#containerCtx;
	#popupGroupCtx;
	#position;
	#popover;
	#snapshot;
	#disconnect;
	#triggerAbort;
	#currentTrigger;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.setAttribute(POPUP_HOST_ATTR, "");
		this.#disconnect = new AbortController();
		this.#popover = createPopover({
			transition: createTransition(),
			onOpenChange: (nextOpen, details) => {
				this.open = nextOpen;
				this.dispatchEvent(new CustomEvent("open-change", { detail: {
					open: nextOpen,
					...details
				} }));
			},
			closeOnEscape: () => this.closeOnEscape,
			closeOnOutsideClick: () => this.closeOnOutsideClick,
			openOnHover: () => this.openOnHover,
			delay: () => this.delay,
			closeDelay: () => this.closeDelay,
			group: () => this.#popupGroupCtx.value
		});
		this.#popover.setPopupElement(this);
		applyElementProps(this, this.#popover.popupProps, { signal: this.#disconnect.signal });
		if (this.#snapshot) this.#snapshot.track(this.#popover.input);
		else this.#snapshot = new SnapshotController(this, this.#popover.input);
	}
	firstUpdated(changed) {
		super.firstUpdated(changed);
		if (this.defaultOpen && !this.open) this.#popover?.open();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	destroyCallback() {
		this.#cleanupTrigger();
		this.#popover?.destroy();
		super.destroyCallback();
	}
	close(reason = "imperative-action") {
		this.#popover?.close(reason);
	}
	get triggerElement() {
		return this.#currentTrigger;
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.#core.setProps(this);
		if (this.#popover && changed.has("open")) {
			const { active: interactionOpen } = this.#popover.input.current;
			if (this.open !== interactionOpen) {
				if (this.open) this.#popover.open();
				else this.#popover.close();
			}
		}
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#popover) return;
		const triggerEl = this.#position.findTrigger();
		this.#syncTrigger(triggerEl);
		const input = this.#popover.input.current;
		this.#core.setInput(input);
		const state = this.#core.getState();
		applyElementProps(this, this.#core.getPopupAttrs(state));
		applyStateDataAttrs(this, state, PopoverDataAttrs);
		if (state.open) tryShowPopover(this);
		else tryHidePopover(this);
		if (this.#currentTrigger) applyElementProps(this.#currentTrigger, this.#core.getTriggerAttrs(state, this.id));
		if (!state.open) {
			this.#position.cleanup();
			return;
		}
		this.#position.sync({
			anchorName: this.id,
			position: {
				side: state.side,
				align: state.align
			},
			trigger: this.#currentTrigger,
			boundary: this.boundary,
			container: this.#containerCtx.value?.container ?? null,
			onSideChange: (side) => this.setAttribute(PopoverDataAttrs.side, side)
		});
	}
	#syncTrigger(triggerEl) {
		if (triggerEl === this.#currentTrigger) return;
		this.#position.cleanup();
		this.#cleanupTrigger();
		this.#currentTrigger = triggerEl;
		this.#popover?.setTriggerElement(triggerEl);
		if (triggerEl && this.#popover) {
			this.#triggerAbort = new AbortController();
			applyElementProps(triggerEl, this.#popover.triggerProps, { signal: this.#triggerAbort.signal });
		}
	}
	#cleanupTrigger() {
		if (this.#currentTrigger) applyElementProps(this.#currentTrigger, {
			"aria-expanded": void 0,
			"aria-haspopup": void 0,
			"aria-controls": void 0
		});
		this.#triggerAbort?.abort();
		this.#triggerAbort = null;
		this.#currentTrigger = null;
	}
};
//#endregion
export { PopoverElement };
