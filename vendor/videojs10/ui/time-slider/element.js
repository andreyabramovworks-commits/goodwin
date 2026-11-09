import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { sliderContext } from "../slider/context.js";
import { SliderCSSVars, TimeSliderCore, TimeSliderDataAttrs } from "@videojs/core";
import { applyElementProps, applyStateDataAttrs, createSlider, createTimeSliderSeek, getTimeSliderCSSVars, selectBuffer, selectControls, selectPlayback, selectTime } from "@videojs/core/dom";
import { hasTimeRange, isMediaPlaying } from "@videojs/media";
import { ContextProvider } from "@videojs/element/context";
import { translateText } from "@videojs/core/i18n";
import { applyStyles } from "@videojs/utils/dom";
import { formatTime } from "@videojs/utils/time";
//#region src/ui/time-slider/element.ts
/**
* @fires drag-start - Fired when a pointer drag starts.
* @fires drag-end - Fired when a pointer drag ends.
*/
var TimeSliderElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.changeThrottle = TimeSliderCore.defaultProps.changeThrottle;
		this.step = TimeSliderCore.defaultProps.step;
		this.largeStep = TimeSliderCore.defaultProps.largeStep;
		this.orientation = TimeSliderCore.defaultProps.orientation;
		this.disabled = TimeSliderCore.defaultProps.disabled;
		this.thumbAlignment = TimeSliderCore.defaultProps.thumbAlignment;
		this.pauseOnDrag = TimeSliderCore.defaultProps.pauseOnDrag;
		this.#core = new TimeSliderCore();
		this.#controlsState = new PlayerController(this, playerContext, selectControls);
		this.#provider = new ContextProvider(this, { context: sliderContext });
		this.#timeState = new PlayerController(this, playerContext, selectTime);
		this.#bufferState = new PlayerController(this, playerContext, selectBuffer);
		this.#playbackState = new PlayerController(this, playerContext, selectPlayback);
		this.#seek = createTimeSliderSeek(SliderCSSVars.fill);
		this.#i18n = new I18nController(this, i18nContext);
		this.#cssVars = {};
		this.#slider = null;
		this.#disconnect = null;
		this.#releaseControlsLock = null;
	}
	static {
		this.tagName = "media-time-slider";
	}
	static {
		this.properties = {
			label: { type: String },
			changeThrottle: {
				type: Number,
				attribute: "change-throttle"
			},
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
			},
			pauseOnDrag: {
				type: Boolean,
				attribute: "pause-on-drag"
			}
		};
	}
	#core;
	#controlsState;
	#provider;
	#timeState;
	#bufferState;
	#playbackState;
	#seek;
	#i18n;
	#cssVars;
	#slider;
	#disconnect;
	#releaseControlsLock;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#disconnect = new AbortController();
		const signal = this.#disconnect.signal;
		let dragSeekPercent;
		const seek = (percent) => {
			const media = this.#timeState.value;
			if (media) {
				const time = this.#core.rawValueFromPercent(percent);
				this.#seek.seek(percent);
				media.seek(time);
			}
		};
		this.#slider = createSlider({
			getElement: () => this,
			getThumbElement: () => this.querySelector("media-slider-thumb"),
			getOrientation: () => this.orientation,
			isDisabled: () => {
				const time = this.#timeState.value;
				const buffer = this.#bufferState.value;
				return this.disabled || !time || !hasTimeRange({
					...time,
					...buffer ?? {
						buffered: [],
						seekable: []
					}
				});
			},
			getPercent: () => {
				const media = this.#timeState.value;
				if (!media) return 0;
				return this.#core.percentFromValue(media.currentTime);
			},
			getStepPercent: () => this.#core.getStepPercent(),
			getLargeStepPercent: () => this.#core.getLargeStepPercent(),
			onValueChange: (percent) => {
				if (!this.#slider?.input.current.dragging || percent === dragSeekPercent) return;
				dragSeekPercent = percent;
				seek(percent);
			},
			onValueCommit: (percent) => {
				if (percent !== dragSeekPercent) seek(percent);
				dragSeekPercent = void 0;
			},
			changeThrottle: this.changeThrottle,
			onPressStart: () => {
				this.#releaseControlsLock ??= this.#controlsState.value?.requestControlsLock() ?? null;
			},
			onPressEnd: () => this.#releaseControlsVisibilityLock(),
			onDragStart: () => {
				this.#core.startDrag(this.#playbackState.value);
				this.dispatchEvent(new CustomEvent("drag-start", { bubbles: true }));
			},
			onDragEnd: () => {
				this.#core.endDrag(this.#playbackState.value);
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
		this.#seek.state.subscribe(() => this.requestUpdate(), { signal });
	}
	disconnectedCallback() {
		this.#releaseControlsVisibilityLock();
		this.#resumeIfDragPaused();
		this.#seek.destroy();
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	destroyCallback() {
		this.#releaseControlsVisibilityLock();
		this.#resumeIfDragPaused();
		this.#seek.destroy();
		this.#slider?.destroy();
		super.destroyCallback();
	}
	#resumeIfDragPaused() {
		this.#core.endDrag(this.#playbackState.value);
	}
	#releaseControlsVisibilityLock() {
		this.#releaseControlsLock?.();
		this.#releaseControlsLock = null;
	}
	willUpdate(_changed) {
		super.willUpdate(_changed);
		this.#core.setProps({
			label: this.label,
			changeThrottle: this.changeThrottle,
			step: this.step,
			largeStep: this.largeStep,
			orientation: this.orientation,
			disabled: this.disabled,
			thumbAlignment: this.thumbAlignment,
			pauseOnDrag: this.pauseOnDrag
		});
		this.#core.setFormatLocale(this.#i18n.locale);
	}
	update(_changed) {
		super.update(_changed);
		if (!this.#slider) return;
		const time = this.#timeState.value;
		const buffer = this.#bufferState.value;
		if (!time) {
			this.#seek.destroy();
			this.removeAttribute("data-playing");
			return;
		}
		this.#core.setInput(this.#slider.input.current);
		const media = {
			...time,
			...buffer ?? {
				buffered: [],
				seekable: []
			}
		};
		this.#core.setMedia(media);
		const state = this.#core.getState();
		this.#seek.update(state.seeking, state.fillPercent, this);
		const percent = this.#seek.state.current.percent;
		this.toggleAttribute("data-playing", isMediaPlaying(this.#playbackState.value) && !state.disabled && !state.dragging && !state.seeking && percent === void 0);
		const fill = percent === void 0 || state.dragging || state.disabled ? state : {
			...state,
			fillPercent: percent
		};
		const cssVars = getTimeSliderCSSVars(this.#slider.adjustForAlignment(fill));
		const styles = Object.fromEntries(Object.entries(cssVars).filter(([name, value]) => this.#cssVars[name] !== value));
		applyStyles(this, styles);
		this.#cssVars = cssVars;
		const thumbAttrs = this.#core.getAttrs(state);
		applyStateDataAttrs(this, state, TimeSliderDataAttrs);
		this.#provider.setValue({
			state,
			stateAttrMap: TimeSliderDataAttrs,
			pointerValue: this.#core.rawValueFromPercent(state.pointerPercent),
			thumbAttrs: {
				...thumbAttrs,
				"aria-label": translateText(thumbAttrs["aria-label"], this.#i18n.value),
				"aria-valuetext": translateText(thumbAttrs["aria-valuetext"], this.#i18n.value, this.#core.getValueTextParams(state))
			},
			thumbProps: this.#slider.thumbProps,
			formatValue: (value) => formatTime(value, state.duration, { locale: this.#i18n.locale })
		});
	}
};
//#endregion
export { TimeSliderElement };
