import { containerContext, playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { PositionController } from "../position-controller.js";
import { menuContext } from "./context.js";
import { popupGroupContext } from "../../player/popup-group-context.js";
import { MenuCore, MenuPopupDataAttrs, POPUP_HOST_ATTR, resolveMenuOptionState } from "@videojs/core";
import { MenuPositioningCSSVars, applyElementProps, applyStateDataAttrs, createMenu, createMenuPopup, createTransition, getRootPositionOptions, selectControls } from "@videojs/core/dom";
import { ContextConsumer, ContextProvider } from "@videojs/element/context";
import { tryHidePopover, tryShowPopover } from "@videojs/utils/dom";
import { SnapshotController } from "@videojs/store/html";
//#region src/ui/menu/element.ts
/**
* Root menu state and positioned popup. Content pages are direct children.
*
* @fires open-change - Fired before the menu's open state changes. Cancel the event to prevent the change.
*/
var MenuElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.open = MenuCore.defaultProps.open;
		this.defaultOpen = MenuCore.defaultProps.defaultOpen;
		this.side = MenuCore.defaultProps.side;
		this.align = MenuCore.defaultProps.align;
		this.closeOnEscape = MenuCore.defaultProps.closeOnEscape;
		this.closeOnOutsideClick = MenuCore.defaultProps.closeOnOutsideClick;
		this.boundary = "container";
		this.#core = new MenuCore();
		this.#provider = new ContextProvider(this, { context: menuContext });
		this.#position = new PositionController(this);
		this.#controlsState = new PlayerController(this, playerContext, selectControls);
		this.#containerCtx = new ContextConsumer(this, {
			context: containerContext,
			subscribe: true
		});
		this.#popupGroupCtx = new ContextConsumer(this, { context: popupGroupContext });
		this.#menu = null;
		this.#popup = null;
		this.#snapshot = null;
		this.#disconnect = null;
		this.#triggerAbort = null;
		this.#currentTrigger = null;
		this.#triggerWasDisabled = false;
		this.#triggerWasHidden = false;
		this.#releaseControlsLock = null;
		this.#optionStates = /* @__PURE__ */ new Map();
		this.#optionState = null;
		this.#handleFocusOut = (event) => {
			this.#menu?.contentProps.onFocusOut(event);
		};
		this.#setOptionState = (source, optionState) => {
			const previous = this.#optionStates.get(source);
			if (optionState && isSameOptionState(previous, optionState)) return;
			if (!optionState && !previous) return;
			if (optionState) this.#optionStates.set(source, optionState);
			else this.#optionStates.delete(source);
			this.#optionState = resolveMenuOptionState(this.#optionStates.values());
			if ((this.#optionState?.disabled || this.#optionState?.hidden) && this.open) this.close("imperative-action");
			this.#syncOptionState(this.#currentTrigger);
		};
	}
	static {
		this.tagName = "media-menu";
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
			closeOnEscape: {
				type: Boolean,
				attribute: "close-on-escape"
			},
			closeOnOutsideClick: {
				type: Boolean,
				attribute: "close-on-outside-click"
			},
			boundary: { type: String }
		};
	}
	#core;
	#provider;
	#position;
	#controlsState;
	#containerCtx;
	#popupGroupCtx;
	#menu;
	#popup;
	#snapshot;
	#disconnect;
	#triggerAbort;
	#currentTrigger;
	#triggerWasDisabled;
	#triggerWasHidden;
	#releaseControlsLock;
	#optionStates;
	#optionState;
	get menu() {
		return this.#menu;
	}
	get popup() {
		return this.#popup;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.setAttribute(POPUP_HOST_ATTR, "");
		this.#disconnect = new AbortController();
		this.#popup = createMenuPopup();
		this.#popup.setElement(this);
		this.#menu = createMenu({
			transition: createTransition(),
			onOpenChange: (nextOpen, details) => {
				if (this.dispatchEvent(new CustomEvent("open-change", {
					bubbles: true,
					cancelable: true,
					composed: true,
					detail: {
						open: nextOpen,
						...details
					}
				}))) this.open = nextOpen;
			},
			closeOnEscape: () => this.closeOnEscape,
			closeOnOutsideClick: () => this.closeOnOutsideClick,
			group: () => this.#popupGroupCtx.value
		});
		this.#menu.setPopupElement(this);
		applyElementProps(this, { onFocusOut: this.#handleFocusOut }, { signal: this.#disconnect.signal });
		if (this.#snapshot) this.#snapshot.track(this.#menu.input);
		else this.#snapshot = new SnapshotController(this, this.#menu.input);
	}
	disconnectedCallback() {
		this.#releaseControlsVisibilityLock();
		super.disconnectedCallback();
		this.#position.cleanup();
		this.#cleanupTrigger();
		this.#popup?.destroy();
		this.#popup = null;
		this.#menu?.destroy();
		this.#menu = null;
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	close(reason = "imperative-action") {
		this.#menu?.close(reason);
	}
	openMenu(reason = "imperative-action") {
		this.#menu?.open(reason);
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		if (!this.hasUpdated && this.defaultOpen && !this.open) this.open = true;
		this.#core.setProps({
			open: this.open,
			defaultOpen: this.defaultOpen,
			side: this.side,
			align: this.align,
			closeOnEscape: this.closeOnEscape,
			closeOnOutsideClick: this.closeOnOutsideClick
		});
		if (this.#menu && changed.has("open")) this.#menu.syncOpen(this.open);
	}
	update(changed) {
		super.update(changed);
		if (!this.#menu || !this.#popup) return;
		const input = this.#menu.input.current;
		this.#core.setInput({
			...input,
			isSubmenu: false
		});
		const state = this.#core.getState();
		if (state.open) this.#releaseControlsLock ??= this.#controlsState.value?.requestControlsLock() ?? null;
		else this.#releaseControlsVisibilityLock();
		const triggerElement = this.#position.findTrigger();
		this.#syncTrigger(triggerElement);
		applyElementProps(this, this.#core.getPopupAttrs());
		applyStateDataAttrs(this, state, MenuPopupDataAttrs);
		if (state.open) tryShowPopover(this);
		else tryHidePopover(this);
		if (this.#currentTrigger) {
			applyElementProps(this.#currentTrigger, this.#core.getTriggerAttrs(state, this.#menu.contentElement?.id));
			this.#syncOptionState(this.#currentTrigger);
		}
		if (!state.open) this.#position.cleanup();
		else {
			this.#popup.sync();
			const positionOptions = getRootPositionOptions(state.side, state.align);
			if (positionOptions && this.#currentTrigger) this.#position.sync({
				anchorName: this.id,
				position: positionOptions,
				trigger: this.#currentTrigger,
				boundary: this.boundary,
				container: this.#containerCtx.value?.container ?? null,
				cssVars: MenuPositioningCSSVars,
				trackResize: false,
				onSideChange: (side) => this.setAttribute(MenuPopupDataAttrs.side, side)
			});
		}
		this.#provider.setValue({
			core: this.#core,
			menu: this.#menu,
			popup: this.#popup,
			state,
			setOptionState: this.#setOptionState
		});
	}
	#releaseControlsVisibilityLock() {
		this.#releaseControlsLock?.();
		this.#releaseControlsLock = null;
	}
	#handleFocusOut;
	#syncTrigger(triggerElement) {
		if (triggerElement === this.#currentTrigger) return;
		this.#position.cleanup();
		this.#cleanupTrigger();
		this.#currentTrigger = triggerElement;
		this.#triggerWasDisabled = triggerElement ? isTriggerExplicitlyDisabled(triggerElement) : false;
		this.#triggerWasHidden = triggerElement?.hidden === true;
		this.#menu?.setTriggerElement(triggerElement);
		if (triggerElement && this.#menu) {
			this.#triggerAbort = new AbortController();
			applyElementProps(triggerElement, this.#menu.triggerProps, { signal: this.#triggerAbort.signal });
			this.#syncOptionState(triggerElement);
		}
	}
	#setOptionState;
	#syncOptionState(trigger) {
		if (!trigger) return;
		applyElementProps(trigger, {
			disabled: this.#triggerWasDisabled || this.#optionState?.disabled || void 0,
			"aria-disabled": this.#triggerWasDisabled || this.#optionState?.disabled ? "true" : void 0,
			"data-availability": this.#optionState?.availability,
			hidden: this.#triggerWasHidden || this.#optionState?.hidden || void 0
		});
		const value = trigger.querySelector("[data-part~=\"value\"], [data-part~=\"hint\"]");
		if (value && value.textContent !== this.#optionState?.value) value.textContent = this.#optionState?.value ?? "";
	}
	#cleanupTrigger() {
		if (this.#currentTrigger) {
			applyElementProps(this.#currentTrigger, {
				"aria-expanded": void 0,
				"aria-haspopup": void 0,
				"aria-controls": void 0,
				disabled: this.#triggerWasDisabled || void 0,
				"aria-disabled": this.#triggerWasDisabled ? "true" : void 0,
				"data-availability": void 0,
				hidden: this.#triggerWasHidden || void 0
			});
			const value = this.#currentTrigger.querySelector("[data-part~=\"value\"], [data-part~=\"hint\"]");
			if (value?.textContent) value.textContent = "";
		}
		this.#triggerAbort?.abort();
		this.#triggerAbort = null;
		this.#currentTrigger = null;
		this.#triggerWasDisabled = false;
		this.#triggerWasHidden = false;
	}
};
function isSameOptionState(a, b) {
	return a?.value === b.value && a.disabled === b.disabled && a.hidden === b.hidden && a.availability === b.availability;
}
function isTriggerExplicitlyDisabled(trigger) {
	return trigger.hasAttribute("disabled") || "disabled" in trigger && trigger.disabled === true;
}
//#endregion
export { MenuElement };
