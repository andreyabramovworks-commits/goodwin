import { ContextPartElement } from "../context-part-element.js";
import { sliderContext } from "./context.js";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/slider/fill.ts
var SliderFillElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: sliderContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-slider-fill";
	}
};
//#endregion
export { SliderFillElement };
