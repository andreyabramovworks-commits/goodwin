import { i18nContext } from "../i18n/context.js";
import { I18nController } from "../i18n/controller.js";
import { UIElement } from "./ui-element.js";
import { AriaKeyShortcutsController } from "./hotkey/aria-key-shortcuts-controller.js";
import { HOTKEY_SHORTCUT_CHANGE_EVENT, applyElementProps, applyStateDataAttrs, createButton } from "@videojs/core/dom";
import { isText, resolveText, translateText } from "@videojs/core/i18n";
import { isBoolean, isObject } from "@videojs/utils/predicate";
//#region src/ui/media-button-element.ts
/**
* Abstract base for HTML custom elements that render a media-control button. `ComponentState` is the state the button
* reflects to data attributes, and `MediaState` is the player state it reads and acts on. Pass both: a subclass that
* omits them still compiles, but types `activate(state)` and `mediaState` as the `ButtonState` and `object` defaults.
*/
var MediaButtonElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.disabled = false;
		this.label = "";
		this.hotkeyAction = void 0;
		this.#disconnect = null;
		this.#hotkeyRegistry = null;
		this.#i18n = new I18nController(this, i18nContext);
	}
	static {
		this.properties = {
			label: { type: String },
			disabled: { type: Boolean }
		};
	}
	getIsButtonDisabled() {
		return this.disabled || !this.mediaState.value;
	}
	handleActivate(event, source) {
		Promise.resolve(this.activate(this.mediaState.value, event, source)).catch((error) => {});
	}
	/** Override to match hotkeys that use action values, such as seek steps. */
	get hotkeyValue() {}
	get $state() {
		return this.core.state;
	}
	#disconnect;
	#hotkeyRegistry;
	#lastHotkeyShortcut;
	#i18n;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		if (this.hotkeyAction && !this.#hotkeyRegistry) this.#hotkeyRegistry = new AriaKeyShortcutsController(this, this.hotkeyAction, { value: () => this.hotkeyValue });
		this.#disconnect = new AbortController();
		const buttonProps = createButton({
			onActivate: (event, source) => this.handleActivate(event, source),
			isDisabled: () => this.getIsButtonDisabled()
		});
		applyElementProps(this, buttonProps, { signal: this.#disconnect.signal });
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	/** Returns the button's current label derived from media state. */
	getLabel() {
		return this.core.state.current.label ? resolveText(this.core.state.current.label) : void 0;
	}
	getShortcut() {
		return this.#hotkeyRegistry?.shortcut;
	}
	/** Resolved label for tooltips and other display surfaces. */
	getResolvedLabel() {
		const media = this.mediaState.value;
		if (!media) return void 0;
		this.core.setMedia(media);
		const state = this.core.getState();
		if (this.core.getTooltipLabel) return translateText(this.core.getTooltipLabel(state), this.#i18n.value);
		return translateText(this.core.getLabel(state), this.#i18n.value, this.core.getLabelParams?.(state));
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.core.setProps?.(this);
	}
	update(changed) {
		super.update(changed);
		const media = this.mediaState.value;
		this.#syncHotkeyShortcut();
		if (!media) return;
		this.core.setMedia(media);
		const state = this.core.getState();
		const attrs = this.core.getAttrs?.(state) ?? {};
		if (isText(attrs["aria-label"])) attrs["aria-label"] = translateText(attrs["aria-label"], this.#i18n.value, this.core.getLabelParams?.(state));
		applyElementProps(this, {
			...attrs,
			"aria-keyshortcuts": this.#hotkeyRegistry?.aria,
			...isHideable(state) && this.reflectsHidden() && { hidden: state.hidden ? "" : void 0 }
		});
		applyStateDataAttrs(this, state, this.stateAttrMap);
		for (const [name, value] of Object.entries(this.core.getCSSVars?.(state) ?? {})) this.style.setProperty(name, value);
	}
	/**
	* Whether this button writes its core's `hidden` state to the `hidden` attribute. A subclass returns `false` while
	* another owner, such as a linked menu, manages its visibility.
	*/
	reflectsHidden() {
		return true;
	}
	#syncHotkeyShortcut() {
		const shortcut = this.getShortcut();
		if (shortcut === this.#lastHotkeyShortcut) return;
		this.#lastHotkeyShortcut = shortcut;
		this.dispatchEvent(new CustomEvent(HOTKEY_SHORTCUT_CHANGE_EVENT));
	}
};
/** Whether a button's core reports whether it should be shown at all. */
function isHideable(state) {
	return isObject(state) && isBoolean(state.hidden);
}
//#endregion
export { MediaButtonElement };
