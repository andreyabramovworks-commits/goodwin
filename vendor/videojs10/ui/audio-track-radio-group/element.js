import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MenuRadioGroupElement } from "../menu/radio-group.js";
import { RadioOptionsController } from "../radio-options/controller.js";
import { AudioTrackRadioGroupCore, AudioTrackRadioGroupDataAttrs } from "@videojs/core";
import { applyStateDataAttrs, selectAudioTrack } from "@videojs/core/dom";
import { translateText } from "@videojs/core/i18n";
//#region src/ui/audio-track-radio-group/element.ts
/**
* Menu radio group that generates a `<media-menu-radio-item>` per available audio track and shares the selected label
* and availability with an enclosing menu. An optional `<template>` holding one `<media-menu-radio-item>` customizes
* each generated item.
*/
var AudioTrackRadioGroupElement = class extends MenuRadioGroupElement {
	constructor(..._args) {
		super(..._args);
		this.disabled = false;
		this.label = "";
		this.formatTrack = AudioTrackRadioGroupCore.defaultProps.formatTrack;
		this.#core = new AudioTrackRadioGroupCore();
		this.#i18n = new I18nController(this, i18nContext);
		this.#mediaState = new PlayerController(this, playerContext, selectAudioTrack);
		this.#options = new RadioOptionsController(this, {
			setItemAttributes: (item, option) => item.setAttribute("data-track", option.value),
			onValueChange: (value) => {
				const media = this.#mediaState.value;
				if (media) this.#core.selectValue(media, value);
			}
		});
	}
	static {
		this.tagName = "media-audio-track-radio-group";
	}
	static {
		this.properties = {
			...MenuRadioGroupElement.properties,
			disabled: { type: Boolean },
			label: { type: String }
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
				formatTrack: this.formatTrack,
				disabled: this.disabled,
				label: this.label
			});
			this.#core.setMedia(media);
			state = this.#core.getState();
			this.applyDefaultAriaLabel(translateText(this.#core.getLabel(state), this.#i18n.value));
			this.#options.sync(state, this.#i18n.value, this.#i18n.locale);
			this.publishMenuOptionState(state.disabled, state.hidden, state.availability);
		} else this.publishMenuOptionState(true, true, "unsupported");
		super.update(changed);
		if (state) applyStateDataAttrs(this, state, AudioTrackRadioGroupDataAttrs);
	}
};
//#endregion
export { AudioTrackRadioGroupElement };
