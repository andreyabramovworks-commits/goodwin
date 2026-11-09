import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MenuRadioGroupElement } from "../menu/radio-group.js";
import { RadioOptionsController } from "../radio-options/controller.js";
import { PlaybackRateRadioGroupCore, PlaybackRateRadioGroupDataAttrs } from "@videojs/core";
import { applyStateDataAttrs, selectPlaybackRate } from "@videojs/core/dom";
import { translateText } from "@videojs/core/i18n";
//#region src/ui/playback-rate-radio-group/element.ts
/**
* Menu radio group that generates a `<media-menu-radio-item>` per available playback rate and shares the selected label
* and availability with an enclosing menu. An optional `<template>` holding one `<media-menu-radio-item>` customizes
* each generated item.
*/
var PlaybackRateRadioGroupElement = class extends MenuRadioGroupElement {
	constructor(..._args) {
		super(..._args);
		this.disabled = false;
		this.rates = void 0;
		this.formatRate = PlaybackRateRadioGroupCore.defaultProps.formatRate;
		this.#core = new PlaybackRateRadioGroupCore();
		this.#i18n = new I18nController(this, i18nContext);
		this.#mediaState = new PlayerController(this, playerContext, selectPlaybackRate);
		this.#options = new RadioOptionsController(this, {
			setItemAttributes: (item, option) => {
				item.setAttribute("data-rate", option.value);
				item.toggleAttribute("data-custom", option.custom);
			},
			getOptionCacheKey: (option) => option.custom ? "custom" : "",
			onValueChange: (value) => {
				const media = this.#mediaState.value;
				if (media) this.#core.selectValue(media, value);
			}
		});
	}
	static {
		this.tagName = "media-playback-rate-radio-group";
	}
	static {
		this.properties = {
			...MenuRadioGroupElement.properties,
			disabled: { type: Boolean },
			rates: { type: String }
		};
	}
	#core;
	#i18n;
	#mediaState;
	#options;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
	}
	update(changed) {
		const media = this.#mediaState.value;
		let state = null;
		if (media) {
			this.#core.setProps({
				formatRate: this.formatRate,
				disabled: this.disabled,
				rates: this.rates
			});
			this.#core.setMedia(media);
			state = this.#core.getState();
			this.applyDefaultAriaLabel(translateText(this.#core.getLabel(state), this.#i18n.value, this.#core.getLabelParams(state)));
			this.#options.sync(state, this.#i18n.value, this.#i18n.locale);
			this.publishMenuOptionState(state.disabled, state.hidden, state.availability);
		} else this.publishMenuOptionState(true, true, "unsupported");
		super.update(changed);
		if (state) applyStateDataAttrs(this, state, PlaybackRateRadioGroupDataAttrs);
	}
};
//#endregion
export { PlaybackRateRadioGroupElement };
