import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { containerContext, playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { popupGroupContext } from "../../player/popup-group-context.js";
import { ContainerCore, ContainerDataAttrs } from "@videojs/core";
import { applyContainerAttrs, applyStateDataAttrs, createPopupGroup, focusContainer, selectControls } from "@videojs/core/dom";
import { ContextConsumer, ContextProvider } from "@videojs/element/context";
import { listen } from "@videojs/utils/dom";
import { labelText } from "@videojs/core/i18n/text/container";
//#region src/ui/container/element.ts
/**
* The visual, interactive player boundary.
*
* A container registers itself with its closest player and provides popup coordination to the controls it contains.
*/
var ContainerElement = class extends UIElement {
	static {
		this.tagName = "media-container";
	}
	#releaseContainer = null;
	#disconnect = null;
	#label = null;
	#core = new ContainerCore();
	#controls = new PlayerController(this, playerContext, selectControls);
	#i18n = new I18nController(this, i18nContext);
	#popupGroup = createPopupGroup();
	#popupGroupProvider = new ContextProvider(this, {
		context: popupGroupContext,
		initialValue: this.#popupGroup
	});
	#container = new ContextConsumer(this, {
		context: containerContext,
		callback: (value) => this.#register(value)
	});
	connectedCallback() {
		super.connectedCallback();
		this.#popupGroupProvider.setValue(this.#popupGroup);
		this.#register(this.#container.value);
		applyContainerAttrs(this);
		this.#applyLabel();
		this.#disconnect = new AbortController();
		listen(this, "pointerup", this.#onPointerUp, { signal: this.#disconnect.signal });
	}
	disconnectedCallback() {
		this.#releaseContainer?.();
		this.#releaseContainer = null;
		this.#disconnect?.abort();
		this.#disconnect = null;
		super.disconnectedCallback();
	}
	update(changed) {
		super.update(changed);
		this.#applyLabel();
		const controls = this.#controls.value;
		if (controls) {
			this.#core.setMedia(controls);
			applyStateDataAttrs(this, this.#core.getState(), ContainerDataAttrs);
		} else this.removeAttribute(ContainerDataAttrs.controlsVisible);
	}
	#register(value) {
		this.#releaseContainer?.();
		this.#releaseContainer = null;
		if (this.isConnected && value) this.#releaseContainer = value.registerContainer(this);
	}
	#applyLabel() {
		const current = this.getAttribute("aria-label");
		if (current && current !== this.#label) return;
		if (this.hasAttribute("aria-labelledby")) {
			if (current === this.#label) {
				this.removeAttribute("aria-label");
				this.#label = null;
			}
			return;
		}
		const label = this.#i18n.value(labelText);
		this.setAttribute("aria-label", label);
		this.#label = label;
	}
	#onPointerUp = () => {
		focusContainer(this);
	};
};
//#endregion
export { ContainerElement };
