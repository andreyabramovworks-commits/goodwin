import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { InputIndicatorElement } from "../input-indicator/element.js";
import { LiveIndicator } from "../input-indicator/live-indicator.js";
import { StatusIndicatorCore, StatusIndicatorDataAttrs, createInputIndicatorLabels, getStatusIndicatorDisplayValue } from "@videojs/core";
import { createTransition } from "@videojs/core/dom";
//#region src/ui/status-indicator/element.ts
var StatusIndicatorElement = class extends InputIndicatorElement {
	static {
		this.tagName = "media-status-indicator";
	}
	static {
		this.properties = {
			actions: { type: String },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			}
		};
	}
	#i18n = new I18nController(this, i18nContext);
	#core = new StatusIndicatorCore();
	#transition = createTransition();
	#liveIndicator = new LiveIndicator({
		host: this,
		dataAttrs: StatusIndicatorDataAttrs,
		render: renderStatusIndicator
	});
	#options = { replayOnUpdate: false };
	#deriveCustomStatus;
	/**
	* Derives display details for actions without built-in feedback, such as custom hotkey actions. Called only when the
	* built-in derivation returns `null`. Set as a JavaScript property; it has no attribute.
	*/
	get deriveCustomStatus() {
		return this.#deriveCustomStatus;
	}
	set deriveCustomStatus(value) {
		this.#deriveCustomStatus = value;
		this.requestUpdate();
	}
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
			actions: parseActions(this.actions),
			closeDelay: this.closeDelay,
			labels: createInputIndicatorLabels(this.#i18n.value),
			deriveCustomStatus: this.#deriveCustomStatus
		});
	}
};
function parseActions(actions) {
	return actions?.split(/[\s,]+/).filter(Boolean);
}
function renderStatusIndicator(element, state) {
	const value = element.querySelector("media-status-indicator-value");
	if (!value) return;
	value.textContent = getStatusIndicatorDisplayValue(state);
}
//#endregion
export { StatusIndicatorElement };
