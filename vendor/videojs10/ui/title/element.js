import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { TitleCore, TitleDataAttrs } from "@videojs/core";
import { applyStateDataAttrs, selectControls, selectMetadata } from "@videojs/core/dom";
//#region src/ui/title/element.ts
/**
* Displays the resolved content title.
*
* The element owns its text content. Set the title through the player's `content-title` attribute.
*/
var TitleElement = class extends UIElement {
	static {
		this.tagName = "media-title";
	}
	#core = new TitleCore();
	#metadataState = new PlayerController(this, playerContext, selectMetadata);
	#controlsState = new PlayerController(this, playerContext, selectControls);
	connectedCallback() {
		super.connectedCallback();
	}
	update(changed) {
		super.update(changed);
		const metadata = this.#metadataState.value;
		if (!metadata) return;
		const state = this.#core.getState(metadata, this.#controlsState.value);
		if (this.textContent !== state.title) this.textContent = state.title;
		this.hidden = state.hidden;
		applyStateDataAttrs(this, state, TitleDataAttrs);
	}
};
//#endregion
export { TitleElement };
