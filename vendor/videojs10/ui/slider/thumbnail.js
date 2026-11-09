import { sliderContext } from "./context.js";
import { ThumbnailElement } from "../thumbnail/element.js";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/slider/thumbnail.ts
/**
* `<media-thumbnail>` whose `time` follows the slider pointer. Left empty, it draws an image of its own; supply an
* `<img>` child to compose overlays or loading indicators beside the image it controls.
*/
var SliderThumbnailElement = class extends ThumbnailElement {
	static {
		this.tagName = "media-slider-thumbnail";
	}
	#ctx = new ContextConsumer(this, {
		context: sliderContext,
		subscribe: true
	});
	update(changed) {
		const ctx = this.#ctx.value;
		if (ctx) this.time = ctx.pointerValue;
		super.update(changed);
	}
};
//#endregion
export { SliderThumbnailElement };
