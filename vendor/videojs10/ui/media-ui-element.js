import { i18nContext } from "../i18n/context.js";
import { I18nController } from "../i18n/controller.js";
import { UIElement } from "./ui-element.js";
import { applyElementProps, applyStateDataAttrs } from "@videojs/core/dom";
import { isText, translateText } from "@videojs/core/i18n";
import { isFunction } from "@videojs/utils/predicate";
//#region src/ui/media-ui-element.ts
/**
* Abstract base for HTML custom elements that display media state with data attributes. `ComponentState` is the state
* the element reflects to data attributes, and `MediaState` is the player state it reads.
*
* @internal
*/
var MediaUIElement = class extends UIElement {
	#i18n = new I18nController(this, i18nContext);
	connectedCallback() {
		super.connectedCallback();
	}
	update(changed) {
		super.update(changed);
		const media = this.mediaState.value;
		if (!media) return;
		this.core.setMedia(media);
		const state = this.core.getState();
		if (isFunction(this.core.getAttrs)) {
			const attrs = this.core.getAttrs(state);
			if (isText(attrs["aria-label"])) attrs["aria-label"] = translateText(attrs["aria-label"], this.#i18n.value);
			applyElementProps(this, attrs);
		}
		applyStateDataAttrs(this, state, this.stateAttrMap);
	}
};
//#endregion
export { MediaUIElement };
