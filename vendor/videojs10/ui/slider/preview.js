import { UIElement } from "../ui-element.js";
import { sliderContext } from "./context.js";
import { applyStateDataAttrs, getSliderPreviewStyle } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
import { applyStyles, observeResize } from "@videojs/utils/dom";
//#region src/ui/slider/preview.ts
var SliderPreviewElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.overflow = "clamp";
		this.#ctx = new ContextConsumer(this, {
			context: sliderContext,
			subscribe: true
		});
		this.#stopObservingResize = null;
		this.#width = 0;
	}
	static {
		this.tagName = "media-slider-preview";
	}
	static {
		this.properties = { overflow: { type: String } };
	}
	#ctx;
	#stopObservingResize;
	#width;
	connectedCallback() {
		super.connectedCallback();
		this.#stopObservingResize = observeResize(this, ([entry]) => {
			this.#width = entry.contentRect.width;
			this.#applyPosition();
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#stopObservingResize?.();
		this.#stopObservingResize = null;
	}
	#applyPosition() {
		applyStyles(this, getSliderPreviewStyle(this.#width, this.overflow));
	}
	update(_changed) {
		super.update(_changed);
		const ctx = this.#ctx.value;
		if (ctx) applyStateDataAttrs(this, ctx.state, ctx.stateAttrMap);
		this.#applyPosition();
	}
};
//#endregion
export { SliderPreviewElement };
