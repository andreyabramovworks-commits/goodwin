import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { sliderContext } from "../slider/context.js";
import { TimeSliderChaptersCore } from "@videojs/core";
import { selectTextTrack, selectTime } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/time-slider/chapter-title.ts
/** Displays the chapter title at the current pointer or keyboard position. */
var TimeSliderChapterTitleElement = class extends UIElement {
	static {
		this.tagName = "media-time-slider-chapter-title";
	}
	#core = new TimeSliderChaptersCore();
	#slider = new ContextConsumer(this, {
		context: sliderContext,
		subscribe: true
	});
	#textTrack = new PlayerController(this, playerContext, selectTextTrack);
	#time = new PlayerController(this, playerContext, selectTime);
	update(_changed) {
		super.update(_changed);
		const slider = this.#slider.value;
		if (!slider) return;
		const duration = this.#time.value?.duration ?? 0;
		const { chapters } = this.#core.getRanges(this.#textTrack.value?.chaptersCues ?? [], 0, duration);
		const keyboard = slider.state.interactive && !slider.state.pointing && !slider.state.dragging;
		const value = slider.state.pointing || slider.state.dragging ? slider.pointerValue : slider.state.value;
		const chapter = this.#core.findChapter(chapters, value);
		this.textContent = chapter?.cue?.text ?? "";
		if (keyboard) {
			this.removeAttribute("aria-hidden");
			this.setAttribute("aria-live", "polite");
		} else {
			this.setAttribute("aria-hidden", "true");
			this.removeAttribute("aria-live");
		}
	}
};
//#endregion
export { TimeSliderChapterTitleElement };
