import { UIElement } from "../ui-element.js";
import { sliderContext } from "./context.js";
import { applyStateDataAttrs } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/slider/value.ts
/** Writes the formatted current or pointer slider value into its own text content, replacing any children. */
var SliderValueElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.type = "current";
		this.#ctx = new ContextConsumer(this, {
			context: sliderContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-slider-value";
	}
	static {
		this.properties = { type: { type: String } };
	}
	#ctx;
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("aria-live", "off");
	}
	update(_changed) {
		super.update(_changed);
		const ctx = this.#ctx.value;
		if (!ctx) return;
		const value = this.type === "pointer" ? ctx.pointerValue : ctx.state.value;
		this.textContent = ctx.formatValue ? ctx.formatValue(value, this.type) : String(Math.round(value));
		applyStateDataAttrs(this, ctx.state, ctx.stateAttrMap);
	}
};
//#endregion
export { SliderValueElement };
