import { containerContext, playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MediaButtonElement } from "../media-button-element.js";
import { FullscreenButtonCore, FullscreenButtonDataAttrs } from "@videojs/core";
import { selectFullscreen } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/fullscreen-button/element.ts
var FullscreenButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.core = new FullscreenButtonCore();
		this.stateAttrMap = FullscreenButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectFullscreen);
		this.hotkeyAction = "toggleFullscreen";
		this.#container = new ContextConsumer(this, {
			context: containerContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-fullscreen-button";
	}
	#container;
	activate(state, _event, source) {
		if (source === "pointer") this.#container.value?.container?.focus({ preventScroll: true });
		return this.core.toggle(state);
	}
};
//#endregion
export { FullscreenButtonElement };
