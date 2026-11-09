import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { InputIndicatorElement } from "../input-indicator/element.js";
import { LiveIndicator } from "../input-indicator/live-indicator.js";
import { SeekIndicatorCore, SeekIndicatorDataAttrs, getSeekIndicatorDisplayValue } from "@videojs/core";
import { createTransition } from "@videojs/core/dom";
//#region src/ui/seek-indicator/element.ts
var SeekIndicatorElement = class extends InputIndicatorElement {
	static {
		this.tagName = "media-seek-indicator";
	}
	static {
		this.properties = { closeDelay: {
			type: Number,
			attribute: "close-delay"
		} };
	}
	#i18n = new I18nController(this, i18nContext);
	#core = new SeekIndicatorCore();
	#transition = createTransition();
	#liveIndicator = new LiveIndicator({
		host: this,
		dataAttrs: SeekIndicatorDataAttrs,
		render: renderSeekIndicator
	});
	get core() {
		return this.#core;
	}
	get transition() {
		return this.#transition;
	}
	get liveIndicator() {
		return this.#liveIndicator;
	}
	syncCoreProps() {
		this.#core.setProps({
			closeDelay: this.closeDelay,
			locale: this.#i18n.locale
		});
	}
};
function renderSeekIndicator(element, state) {
	const value = element.querySelector("media-seek-indicator-value");
	if (!value) return;
	value.textContent = getSeekIndicatorDisplayValue(state);
}
//#endregion
export { SeekIndicatorElement };
