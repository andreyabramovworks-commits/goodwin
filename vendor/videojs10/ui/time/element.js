import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { TimeCore, TimeDataAttrs } from "@videojs/core";
import { applyElementProps, applyStateDataAttrs, selectBuffer, selectTime } from "@videojs/core/dom";
import { hasTimeRange } from "@videojs/media";
import { translateText } from "@videojs/core/i18n";
import { isInteractiveActivation } from "@videojs/utils/dom";
import { durationSuffixText, elapsedSuffixText, remainingSuffixText } from "@videojs/core/i18n/text/time";
import { formatTimeAsPhrase } from "@videojs/utils/time";
//#region src/ui/time/element.ts
var TimeElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.type = TimeCore.defaultProps.type;
		this.negativeSign = TimeCore.defaultProps.negativeSign;
		this.label = "";
		this.toggle = TimeCore.defaultProps.toggle;
		this.#core = new TimeCore();
		this.#state = new PlayerController(this, playerContext, selectTime);
		this.#buffer = new PlayerController(this, playerContext, selectBuffer);
		this.#i18n = new I18nController(this, i18nContext);
		this.#signSpan = document.createElement("span");
		this.#textNode = new Text();
		this.#disconnect = null;
		this.#listening = false;
		this.#activeType = TimeCore.defaultProps.type;
		this.#handleClick = (event) => {
			if (event.defaultPrevented || !this.toggle || !this.#state.value || !this.#hasTimeRange()) return;
			this.#toggleType();
		};
		this.#handleKeyDown = (event) => {
			if (event.defaultPrevented || !isInteractiveActivation(event)) return;
			if (!this.toggle || !this.#state.value || !this.#hasTimeRange()) return;
			event.preventDefault();
			if (event.repeat) return;
			this.#toggleType();
		};
	}
	static {
		this.tagName = "media-time";
	}
	static {
		this.properties = {
			type: { type: String },
			negativeSign: {
				type: String,
				attribute: "negative-sign"
			},
			label: { type: String },
			toggle: { type: Boolean }
		};
	}
	#core;
	#state;
	#buffer;
	#i18n;
	#signSpan;
	#textNode;
	#disconnect;
	#listening;
	#activeType;
	connectedCallback() {
		super.connectedCallback();
		this.#disconnect = new AbortController();
		this.#syncListeners();
		if (!this.#signSpan.parentNode) {
			this.#signSpan.setAttribute("aria-hidden", "true");
			this.#signSpan.hidden = true;
			this.append(this.#signSpan, this.#textNode);
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
		this.#listening = false;
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		if (changed.has("type") || changed.has("toggle")) this.#activeType = this.type;
	}
	update(changed) {
		super.update(changed);
		if (changed.has("toggle")) this.#syncListeners();
		const media = this.#state.value;
		if (!media) {
			this.#clearAttrs();
			return;
		}
		this.#core.setProps({
			type: this.toggle ? this.#activeType : this.type,
			negativeSign: this.negativeSign,
			label: this.label,
			toggle: this.toggle
		});
		this.#core.setMedia({
			...media,
			seekable: this.#buffer.value?.seekable ?? []
		});
		this.#core.setFormatLocale(this.#i18n.locale);
		const state = this.#core.getState();
		this.#signSpan.hidden = !state.negative;
		this.#signSpan.textContent = state.negative ? this.negativeSign : "";
		this.#textNode.textContent = state.text;
		const attrs = this.#core.getAttrs(state, this.type);
		const label = translateText(attrs["aria-label"], this.#i18n.value, this.#getLabelParams(state));
		const description = attrs["aria-description"] ? translateText(attrs["aria-description"], this.#i18n.value) : void 0;
		applyElementProps(this, {
			"aria-label": label,
			"aria-description": description,
			"aria-disabled": attrs["aria-disabled"],
			role: this.toggle ? attrs.role : "time",
			tabIndex: attrs.tabIndex,
			datetime: this.toggle || state.unavailable ? void 0 : state.datetime
		});
		applyStateDataAttrs(this, state, TimeDataAttrs);
	}
	#getLabelParams(state) {
		if (!this.#core.getLabelParams(state)) return void 0;
		const duration = formatTimeAsPhrase(Math.abs(state.seconds), { locale: this.#i18n.locale });
		const text = {
			current: elapsedSuffixText,
			duration: durationSuffixText,
			remaining: remainingSuffixText
		}[state.type];
		return { duration: translateText(text, this.#i18n.value, { duration }) };
	}
	#handleClick;
	#handleKeyDown;
	#toggleType() {
		if (this.type === "current") this.#activeType = this.#activeType === "remaining" ? "current" : "remaining";
		else this.#activeType = this.#activeType === "duration" ? "remaining" : "duration";
		this.requestUpdate();
	}
	#hasTimeRange() {
		const media = this.#state.value;
		if (!media) return false;
		return hasTimeRange({
			...media,
			seekable: this.#buffer.value?.seekable ?? []
		});
	}
	#syncListeners() {
		if (!this.toggle || !this.#disconnect || this.#listening) return;
		this.#listening = true;
		applyElementProps(this, {
			onClick: this.#handleClick,
			onKeyDown: this.#handleKeyDown
		}, { signal: this.#disconnect.signal });
	}
	#clearAttrs() {
		applyElementProps(this, {
			"aria-label": void 0,
			"aria-description": void 0,
			"aria-disabled": void 0,
			role: void 0,
			tabIndex: void 0,
			datetime: void 0,
			"data-type": void 0,
			"data-disabled": void 0,
			"data-unavailable": void 0
		});
	}
};
//#endregion
export { TimeElement };
