import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { sliderContext } from "../slider/context.js";
import { VolumeSliderCore, VolumeSliderDataAttrs } from "@videojs/core";
import { applyElementProps, applyStateDataAttrs, createSlider, createWheelStep, getSliderCSSVars, selectControls, selectVolume } from "@videojs/core/dom";
import { ContextProvider } from "@videojs/element/context";
import { translateText } from "@videojs/core/i18n";
import { applyStyles } from "@videojs/utils/dom";
//#region src/ui/volume-slider/element.ts
/**
* @fires drag-start - Fired when a pointer drag starts.
* @fires drag-end - Fired when a pointer drag ends.
*/
var VolumeSliderElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.step = VolumeSliderCore.defaultProps.step;
		this.largeStep = VolumeSliderCore.defaultProps.largeStep;
		this.wheelStep = VolumeSliderCore.defaultProps.wheelStep;
		this.orientation = VolumeSliderCore.defaultProps.orientation;
		this.disabled = VolumeSliderCore.defaultProps.disabled;
		this.thumbAlignment = VolumeSliderCore.defaultProps.thumbAlignment;
		this.#core = new VolumeSliderCore();
		this.#controlsState = new PlayerController(this, playerContext, selectControls);
		this.#provider = new ContextProvider(this, { context: sliderContext });
		this.#volumeState = new PlayerController(this, playerContext, selectVolume);
		this.#i18n = new I18nController(this, i18nContext);
		this.#slider = null;
		this.#disconnect = null;
		this.#releaseControlsLock = null;
	}
	static {
		this.tagName = "media-volume-slider";
	}
	static {
		this.properties = {
			label: { type: String },
			step: { type: Number },
			largeStep: {
				type: Number,
				attribute: "large-step"
			},
			wheelStep: {
				type: Number,
				attribute: "wheel-step"
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
	#provider;
	#volumeState;
	#i18n;
	#slider;
	#disconnect;
	#releaseControlsLock;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#disconnect = new AbortController();
		const signal = this.#disconnect.signal;
		const isDisabled = () => {
			const volume = this.#volumeState.value;
			return this.disabled || !volume || volume.volumeAvailability !== "available";
		};
		const getPercent = () => (this.#volumeState.value?.volume ?? 0) * 100;
		const getStepPercent = () => this.#core.getStepPercent();
		const setVolume = (percent) => this.#setVolume(percent);
		this.#slider = createSlider({
			getElement: () => this,
			getThumbElement: () => this.querySelector("media-slider-thumb"),
			getOrientation: () => this.orientation,
			isDisabled,
			getPercent,
			getStepPercent,
			getLargeStepPercent: () => this.#core.getLargeStepPercent(),
			onValueChange: setVolume,
			onValueCommit: setVolume,
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
		const wheelProps = createWheelStep({
			isDisabled,
			getPercent,
			getStepPercent: () => this.#core.getWheelStepPercent(),
			onValueChange: (percent) => this.#volumeState.value?.setVolume(this.#core.rawValueFromPercent(percent) / 100)
		});
		applyElementProps(this, this.#slider.rootProps, { signal });
		applyElementProps(this, wheelProps, { signal });
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
		this.#core.setFormatLocale(this.#i18n.locale);
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#slider) return;
		const media = this.#volumeState.value;
		if (!media) return;
		this.#core.setInput(this.#slider.input.current);
		this.#core.setMedia(media);
		const state = this.#core.getState();
		const cssVars = getSliderCSSVars(this.#slider.adjustForAlignment(state));
		const thumbAttrs = this.#core.getAttrs(state);
		applyStyles(this, cssVars);
		applyStateDataAttrs(this, state, VolumeSliderDataAttrs);
		applyElementProps(this, { hidden: state.hidden ? "" : void 0 });
		this.#provider.setValue({
			state,
			stateAttrMap: VolumeSliderDataAttrs,
			pointerValue: this.#core.valueFromPercent(state.pointerPercent),
			thumbAttrs: {
				...thumbAttrs,
				"aria-label": translateText(thumbAttrs["aria-label"], this.#i18n.value),
				"aria-valuetext": translateText(thumbAttrs["aria-valuetext"], this.#i18n.value, this.#core.getValueTextParams(state))
			},
			thumbProps: this.#slider.thumbProps,
			formatValue: (value) => `${Math.round(value)}%`
		});
	}
	#setVolume(percent) {
		this.#volumeState.value?.setVolume(this.#core.valueFromPercent(percent) / 100);
	}
};
//#endregion
export { VolumeSliderElement };
