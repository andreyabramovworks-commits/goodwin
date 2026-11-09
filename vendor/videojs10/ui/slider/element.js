import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { sliderContext } from "./context.js";
import { SliderCore, SliderDataAttrs } from "@videojs/core";
import { applyElementProps, applyStateDataAttrs, createSlider, getSliderCSSVars, selectControls } from "@videojs/core/dom";
import { ContextProvider } from "@videojs/element/context";
import { translateText } from "@videojs/core/i18n";
import { applyStyles } from "@videojs/utils/dom";
//#region src/ui/slider/element.ts
/**
* @fires value-change - Fired while the slider value changes during an interaction.
* @fires value-commit - Fired when an interaction commits the slider value.
* @fires drag-start - Fired when a pointer drag starts.
* @fires drag-end - Fired when a pointer drag ends.
*/
var SliderElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.value = SliderCore.defaultProps.value;
		this.min = SliderCore.defaultProps.min;
		this.max = SliderCore.defaultProps.max;
		this.step = SliderCore.defaultProps.step;
		this.largeStep = SliderCore.defaultProps.largeStep;
		this.orientation = SliderCore.defaultProps.orientation;
		this.disabled = SliderCore.defaultProps.disabled;
		this.thumbAlignment = SliderCore.defaultProps.thumbAlignment;
		this.#core = new SliderCore();
		this.#controlsState = new PlayerController(this, playerContext, selectControls);
		this.#i18n = new I18nController(this, i18nContext);
		this.#provider = new ContextProvider(this, { context: sliderContext });
		this.#slider = null;
		this.#disconnect = null;
		this.#releaseControlsLock = null;
	}
	static {
		this.tagName = "media-slider";
	}
	static {
		this.properties = {
			label: { type: String },
			value: { type: Number },
			min: { type: Number },
			max: { type: Number },
			step: { type: Number },
			largeStep: {
				type: Number,
				attribute: "large-step"
			},
			orientation: { type: String },
			disabled: { type: Boolean },
			thumbAlignment: {
				type: String,
				attribute: "thumb-alignment"
			}
		};
	}
	#core;
	#controlsState;
	#i18n;
	#provider;
	#slider;
	#disconnect;
	#releaseControlsLock;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#disconnect = new AbortController();
		const signal = this.#disconnect.signal;
		this.#slider = createSlider({
			getElement: () => this,
			getThumbElement: () => this.querySelector("media-slider-thumb"),
			getOrientation: () => this.orientation,
			isDisabled: () => this.disabled,
			getPercent: () => this.#core.percentFromValue(this.value),
			getStepPercent: () => this.#core.getStepPercent(),
			getLargeStepPercent: () => this.#core.getLargeStepPercent(),
			onValueChange: (percent) => {
				this.value = this.#core.valueFromPercent(percent);
				this.dispatchEvent(new CustomEvent("value-change", {
					detail: { value: this.value },
					bubbles: true
				}));
			},
			onValueCommit: (percent) => {
				this.value = this.#core.valueFromPercent(percent);
				this.dispatchEvent(new CustomEvent("value-commit", {
					detail: { value: this.value },
					bubbles: true
				}));
			},
			onPressStart: () => {
				this.#releaseControlsLock ??= this.#controlsState.value?.requestControlsLock() ?? null;
			},
			onPressEnd: () => this.#releaseControlsVisibilityLock(),
			onDragStart: () => {
				this.dispatchEvent(new CustomEvent("drag-start", { bubbles: true }));
			},
			onDragEnd: () => {
				this.dispatchEvent(new CustomEvent("drag-end", { bubbles: true }));
			},
			adjustPercent: (raw, thumbSize, trackSize) => this.#core.adjustPercentForAlignment(raw, thumbSize, trackSize),
			onResize: () => {
				if (this.thumbAlignment === "edge") this.requestUpdate();
			}
		});
		applyElementProps(this, this.#slider.rootProps, { signal });
		applyStyles(this, this.#slider.rootStyle);
		this.#slider.input.subscribe(() => this.requestUpdate(), { signal });
	}
	disconnectedCallback() {
		this.#releaseControlsVisibilityLock();
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	destroyCallback() {
		this.#releaseControlsVisibilityLock();
		this.#slider?.destroy();
		super.destroyCallback();
	}
	#releaseControlsVisibilityLock() {
		this.#releaseControlsLock?.();
		this.#releaseControlsLock = null;
	}
	willUpdate(_changed) {
		super.willUpdate(_changed);
		this.#core.setProps(this);
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#slider) return;
		this.#core.setInput(this.#slider.input.current);
		const state = this.#core.getSliderState(this.value);
		const cssVars = getSliderCSSVars(this.#slider.adjustForAlignment(state));
		applyStyles(this, cssVars);
		applyStateDataAttrs(this, state, SliderDataAttrs);
		this.#provider.setValue({
			state,
			stateAttrMap: SliderDataAttrs,
			pointerValue: this.#core.valueFromPercent(state.pointerPercent),
			thumbAttrs: (() => {
				const attrs = this.#core.getAttrs(state);
				return {
					...attrs,
					"aria-label": translateText(attrs["aria-label"], this.#i18n.value)
				};
			})(),
			thumbProps: this.#slider.thumbProps
		});
	}
};
//#endregion
export { SliderElement };
