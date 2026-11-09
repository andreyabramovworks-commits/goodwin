import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { InputIndicatorElement } from "../input-indicator/element.js";
import { LiveIndicator } from "../input-indicator/live-indicator.js";
import { VolumeIndicatorCSSVars, VolumeIndicatorCore, VolumeIndicatorDataAttrs, createInputIndicatorLabels, getVolumeIndicatorDisplayValue } from "@videojs/core";
import { createTransition } from "@videojs/core/dom";
//#region src/ui/volume-indicator/element.ts
var VolumeIndicatorElement = class extends InputIndicatorElement {
	static {
		this.tagName = "media-volume-indicator";
	}
	static {
		this.properties = { closeDelay: {
			type: Number,
			attribute: "close-delay"
		} };
	}
	#i18n = new I18nController(this, i18nContext);
	#core = new VolumeIndicatorCore();
	#transition = createTransition();
	#liveIndicator = new LiveIndicator({
		host: this,
		dataAttrs: VolumeIndicatorDataAttrs,
		render: renderVolumeIndicator
	});
	#options = { replayOnUpdate: false };
	get core() {
		return this.#core;
	}
	get transition() {
		return this.#transition;
	}
	get liveIndicator() {
		return this.#liveIndicator;
	}
	get options() {
		return this.#options;
	}
	syncCoreProps() {
		this.#core.setProps({
			closeDelay: this.closeDelay,
			labels: createInputIndicatorLabels(this.#i18n.value)
		});
	}
};
function renderVolumeIndicator(element, state) {
	const fill = element.querySelector("media-volume-indicator-fill");
	const value = element.querySelector("media-volume-indicator-value");
	if (state.fill) fill?.style.setProperty(VolumeIndicatorCSSVars.fill, state.fill);
	else fill?.style.removeProperty(VolumeIndicatorCSSVars.fill);
	if (value) value.textContent = getVolumeIndicatorDisplayValue(state);
}
//#endregion
export { VolumeIndicatorElement };
