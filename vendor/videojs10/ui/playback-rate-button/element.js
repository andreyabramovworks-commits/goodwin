import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MediaButtonElement } from "../media-button-element.js";
import { PlaybackRateButtonCore, PlaybackRateButtonDataAttrs } from "@videojs/core";
import { applyElementProps, selectPlaybackRate } from "@videojs/core/dom";
//#region src/ui/playback-rate-button/element.ts
var PlaybackRateButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.commandfor = void 0;
		this.rates = void 0;
		this.core = new PlaybackRateButtonCore();
		this.stateAttrMap = PlaybackRateButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectPlaybackRate);
		this.hotkeyAction = "speedUp";
	}
	static {
		this.tagName = "media-playback-rate-button";
	}
	static {
		this.properties = {
			label: { type: String },
			disabled: { type: Boolean },
			commandfor: { type: String },
			rates: { type: String }
		};
	}
	activate(state, event) {
		if (this.commandfor) {
			if (event instanceof KeyboardEvent) this.click();
			return;
		}
		this.core.cycle(state);
	}
	getIsButtonDisabled() {
		const media = this.mediaState.value;
		if (super.getIsButtonDisabled()) return true;
		if (this.commandfor && media && this.core.getRates(media).length === 0) return true;
		return false;
	}
	reflectsHidden() {
		return !this.commandfor;
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		if (changed.has("commandfor")) {
			if (this.commandfor) this.setAttribute("commandfor", this.commandfor);
			else this.removeAttribute("commandfor");
		}
	}
	update(changed) {
		super.update(changed);
		if (!this.mediaState.value || !this.commandfor) return;
		applyElementProps(this, { "aria-disabled": this.getIsButtonDisabled() ? "true" : void 0 });
	}
};
//#endregion
export { PlaybackRateButtonElement };
