import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { sliderContext } from "../slider/context.js";
import { SliderSegmentsCore, TimeSliderChapterCSSVars, TimeSliderChapterDataAttrs, TimeSliderChaptersCore } from "@videojs/core";
import { applyStateDataAttrs, selectBuffer, selectTextTrack, selectTime } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
import { cloneTemplateRoot, getTemplateElement, getTemplateRoot } from "@videojs/utils/dom";
//#region src/ui/time-slider/chapters.ts
/**
* Clones a light-DOM template once per normalized chapter range.
*
* The required template must contain exactly one HTML root element. When no chapter cues are available, the template is
* cloned once for a full-duration range.
*/
var TimeSliderChaptersElement = class extends UIElement {
	static {
		this.tagName = "media-time-slider-chapters";
	}
	#segments = new SliderSegmentsCore();
	#core = new TimeSliderChaptersCore();
	#slider = new ContextConsumer(this, {
		context: sliderContext,
		subscribe: true
	});
	#textTrack = new PlayerController(this, playerContext, selectTextTrack);
	#buffer = new PlayerController(this, playerContext, selectBuffer);
	#time = new PlayerController(this, playerContext, selectTime);
	#rendered = /* @__PURE__ */ new Map();
	#templateRoot = null;
	#templateChecked = false;
	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("aria-hidden", "true");
	}
	update(_changed) {
		super.update(_changed);
		const slider = this.#slider.value;
		const duration = this.#time.value?.duration ?? 0;
		const templateRoot = this.#getTemplateRoot();
		if (!slider) return;
		applyStateDataAttrs(this, slider.state, slider.stateAttrMap);
		if (!templateRoot) return;
		const { chapters, ranges, max } = this.#core.getRanges(this.#textTrack.value?.chaptersCues ?? [], 0, duration);
		const geometry = this.#segments.getGeometry({
			ranges,
			min: 0,
			max,
			orientation: slider.state.orientation
		});
		const buffered = this.#buffer.value?.buffered ?? [];
		const bufferedEnd = buffered.length ? buffered[buffered.length - 1][1] : 0;
		const next = /* @__PURE__ */ new Map();
		for (const segment of geometry) {
			const state = this.#core.getState(this.#segments.getState(segment, slider.state, slider.pointerValue), chapters, bufferedEnd);
			let root = this.#rendered.get(state.key);
			if (!root) root = cloneTemplateRoot(templateRoot, this.ownerDocument);
			this.#setStyle(root, "pointer-events", state.cue ? void 0 : "none");
			this.#setStyle(root, TimeSliderChapterCSSVars.start, state.startPercent);
			this.#setStyle(root, TimeSliderChapterCSSVars.end, state.endPercent);
			this.#setStyle(root, TimeSliderChapterCSSVars.width, state.width ?? state.height);
			this.#setStyle(root, TimeSliderChapterCSSVars.fill, `${state.fillPercent}%`);
			this.#setStyle(root, TimeSliderChapterCSSVars.buffer, `${state.bufferPercent}%`);
			applyStateDataAttrs(root, slider.state, slider.stateAttrMap);
			applyStateDataAttrs(root, state, TimeSliderChapterDataAttrs);
			next.set(state.key, root);
		}
		for (const [key, root] of this.#rendered) if (!next.has(key)) root.remove();
		let before = null;
		for (const root of [...next.values()].reverse()) {
			if (root.parentNode !== this || root.nextSibling !== before) this.insertBefore(root, before);
			before = root;
		}
		this.#rendered.clear();
		for (const [key, rendered] of next) this.#rendered.set(key, rendered);
	}
	#getTemplateRoot() {
		if (this.#templateChecked) return this.#templateRoot;
		const template = getTemplateElement(this);
		if (!template) {
			for (const node of [...this.childNodes]) node.remove();
			return null;
		}
		this.#templateChecked = true;
		const root = getTemplateRoot(template);
		for (const node of [...this.childNodes]) if (node !== template) node.remove();
		if (root?.namespaceURI !== "http://www.w3.org/1999/xhtml") return null;
		this.#templateRoot = root;
		return this.#templateRoot;
	}
	#setStyle(element, name, value) {
		if (value === void 0) element.style.removeProperty(name);
		else element.style.setProperty(name, value);
	}
};
//#endregion
export { TimeSliderChaptersElement };
