import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { controlsContext } from "./context.js";
import { ControlsCore, ControlsDataAttrs, POPUP_HOST_SELECTOR } from "@videojs/core";
import { applyStateDataAttrs, selectControls } from "@videojs/core/dom";
import { ContextProvider } from "@videojs/element/context";
import { isFunction } from "@videojs/utils/predicate";
//#region src/ui/controls/element.ts
/**
* Tracks controls visibility, reflects it as data attributes, and shares it with its descendant controls parts. Hiding
* the controls closes any popup open inside it.
*/
var ControlsElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.visibility = ControlsCore.defaultProps.visibility;
		this.#core = new ControlsCore();
		this.#mediaState = new PlayerController(this, playerContext, selectControls);
		this.#provider = new ContextProvider(this, { context: controlsContext });
		this.#visible = true;
	}
	static {
		this.tagName = "media-controls";
	}
	static {
		this.properties = { visibility: { type: String } };
	}
	#core;
	#mediaState;
	#provider;
	#visible;
	connectedCallback() {
		super.connectedCallback();
	}
	update(_changed) {
		super.update(_changed);
		this.#core.setProps({ visibility: this.visibility });
		this.#core.setMedia(this.#mediaState.value ?? null);
		const state = this.#core.getState();
		if (!state) return;
		applyStateDataAttrs(this, state, ControlsDataAttrs);
		this.#provider.setValue({
			state,
			stateAttrMap: ControlsDataAttrs
		});
		const wasVisible = this.#visible;
		this.#visible = state.visible;
		if (wasVisible && !state.visible) this.#closeOwnedOverlays();
	}
	#closeOwnedOverlays() {
		for (const element of this.querySelectorAll(POPUP_HOST_SELECTOR)) {
			const host = element;
			if (!isFunction(host.close)) continue;
			host.close("imperative-action");
		}
	}
};
//#endregion
export { ControlsElement };
