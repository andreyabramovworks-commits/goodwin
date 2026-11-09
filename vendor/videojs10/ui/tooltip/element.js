import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { containerContext } from "../../player/context.js";
import { UIElement } from "../ui-element.js";
import { PositionController } from "../position-controller.js";
import { popupGroupContext } from "../../player/popup-group-context.js";
import { tooltipGroupContext } from "./context.js";
import { TooltipLabelElement } from "./label.js";
import { TooltipShortcutElement } from "./shortcut.js";
import { POPUP_HOST_ATTR, TooltipCSSVars, TooltipCore, TooltipDataAttrs } from "@videojs/core";
import { HOTKEY_SHORTCUT_CHANGE_EVENT, applyElementProps, applyStateDataAttrs, createTooltip, createTransition } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
import { translateText } from "@videojs/core/i18n";
import { listen, tryHidePopover, tryShowPopover } from "@videojs/utils/dom";
import { SnapshotController } from "@videojs/store/html";
import { isFunction } from "@videojs/utils/predicate";
//#region src/ui/tooltip/element.ts
function isLabelTrigger(el) {
	return "$state" in el;
}
/** @fires open-change - Fired when the tooltip's open state changes. */
var TooltipElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.open = TooltipCore.defaultProps.open;
		this.defaultOpen = TooltipCore.defaultProps.defaultOpen;
		this.side = TooltipCore.defaultProps.side;
		this.align = TooltipCore.defaultProps.align;
		this.delay = TooltipCore.defaultProps.delay;
		this.closeDelay = TooltipCore.defaultProps.closeDelay;
		this.disableHoverablePopup = TooltipCore.defaultProps.disableHoverablePopup;
		this.disabled = TooltipCore.defaultProps.disabled;
		this.sticky = TooltipCore.defaultProps.sticky;
		this.boundary = "container";
		this.trigger = "";
		this.#core = new TooltipCore();
		this.#i18n = new I18nController(this, i18nContext);
		this.#groupConsumer = new ContextConsumer(this, { context: tooltipGroupContext });
		this.#containerCtx = new ContextConsumer(this, {
			context: containerContext,
			subscribe: true
		});
		this.#popupGroupCtx = new ContextConsumer(this, { context: popupGroupContext });
		this.#position = new PositionController(this);
		this.#tooltip = null;
		this.#snapshot = null;
		this.#disconnect = null;
		this.#triggerAbort = null;
		this.#currentTrigger = null;
	}
	static {
		this.tagName = "media-tooltip";
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
			delay: { type: Number },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			},
			disableHoverablePopup: {
				type: Boolean,
				attribute: "disable-hoverable-popup"
			},
			disabled: { type: Boolean },
			sticky: { type: Boolean },
			boundary: { type: String },
			trigger: { type: String }
		};
	}
	#core;
	#i18n;
	#groupConsumer;
	#containerCtx;
	#popupGroupCtx;
	#position;
	#tooltip;
	#snapshot;
	#disconnect;
	#triggerAbort;
	#currentTrigger;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.setAttribute(POPUP_HOST_ATTR, "");
		this.#disconnect = new AbortController();
		this.#tooltip = createTooltip({
			transition: createTransition(),
			onOpenChange: (nextOpen, details) => {
				this.open = nextOpen;
				this.dispatchEvent(new CustomEvent("open-change", { detail: {
					open: nextOpen,
					...details
				} }));
			},
			delay: () => this.delay,
			closeDelay: () => this.closeDelay,
			disableHoverablePopup: () => this.disableHoverablePopup,
			disabled: () => this.disabled,
			sticky: () => this.sticky,
			group: () => this.#groupConsumer.value,
			popupGroup: () => this.#popupGroupCtx.value
		});
		this.#tooltip.setPopupElement(this);
		applyElementProps(this, this.#tooltip.popupProps, { signal: this.#disconnect.signal });
		if (this.#snapshot) this.#snapshot.track(this.#tooltip.input);
		else this.#snapshot = new SnapshotController(this, this.#tooltip.input);
	}
	firstUpdated(changed) {
		super.firstUpdated(changed);
		if (this.defaultOpen && !this.open) this.#tooltip?.open();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#cleanupTrigger();
		this.#tooltip?.destroy();
		this.#tooltip = null;
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	close(reason = "imperative-action") {
		this.#tooltip?.close(reason);
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.#core.setProps(this);
		if (this.#tooltip && changed.has("open")) {
			const { active: interactionOpen } = this.#tooltip.input.current;
			if (this.open !== interactionOpen) {
				if (this.open) this.#tooltip.open();
				else this.#tooltip.close();
			}
		}
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#tooltip) return;
		const triggerEl = this.#position.findTrigger(this.trigger);
		this.#syncTrigger(triggerEl);
		if (this.#currentTrigger && isLabelTrigger(this.#currentTrigger)) this.#syncContent(this.#currentTrigger);
		const input = this.#tooltip.input.current;
		this.#core.setInput(input);
		const state = this.#core.getState();
		applyElementProps(this, this.#core.getPopupAttrs(state));
		applyStateDataAttrs(this, state, TooltipDataAttrs);
		if (state.open) tryShowPopover(this);
		else tryHidePopover(this);
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
			cssVars: TooltipCSSVars,
			onSideChange: (side) => this.setAttribute(TooltipDataAttrs.side, side)
		});
	}
	#syncTrigger(triggerEl) {
		if (triggerEl === this.#currentTrigger) return;
		this.#position.cleanup();
		this.#cleanupTrigger();
		this.#currentTrigger = triggerEl;
		this.#tooltip?.setTriggerElement(triggerEl);
		if (triggerEl && this.#tooltip) {
			this.#triggerAbort = new AbortController();
			applyElementProps(triggerEl, this.#tooltip.triggerProps, { signal: this.#triggerAbort.signal });
			if (isLabelTrigger(triggerEl)) {
				this.#syncContent(triggerEl);
				triggerEl.$state.subscribe(() => this.#syncContent(triggerEl), { signal: this.#triggerAbort.signal });
				listen(triggerEl, HOTKEY_SHORTCUT_CHANGE_EVENT, () => this.#syncContent(triggerEl), { signal: this.#triggerAbort.signal });
			}
		}
	}
	#syncContent(triggerEl) {
		const label = triggerEl.getLabel();
		let resolved = isFunction(triggerEl.getResolvedLabel) ? triggerEl.getResolvedLabel() : void 0;
		if (resolved === void 0 && label) resolved = translateText(label, this.#i18n.value);
		const shortcut = triggerEl.getShortcut?.();
		let labelEl = TooltipLabelElement.findIn(this);
		let shortcutEl = TooltipShortcutElement.findIn(this);
		if (!labelEl && !shortcutEl) {
			if (this.#hostHasAuthoredTooltipContent()) return;
			labelEl = TooltipLabelElement.create();
			shortcutEl = TooltipShortcutElement.create();
			this.replaceChildren(labelEl, shortcutEl);
		}
		labelEl?.setSyncedText(resolved ?? "");
		shortcutEl?.setSyncedShortcut(shortcut);
	}
	#hostHasAuthoredTooltipContent() {
		return Array.from(this.childNodes).some((node) => !!node.textContent?.trim());
	}
	#cleanupTrigger() {
		this.#triggerAbort?.abort();
		this.#triggerAbort = null;
		this.#currentTrigger = null;
	}
};
//#endregion
export { TooltipElement };
