import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MediaButtonElement } from "../media-button-element.js";
import { MuteButtonCore, MuteButtonDataAttrs } from "@videojs/core";
import { selectVolume } from "@videojs/core/dom";
//#region src/ui/mute-button/element.ts
var MuteButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.core = new MuteButtonCore();
		this.stateAttrMap = MuteButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectVolume);
		this.hotkeyAction = "toggleMuted";
	}
	static {
		this.tagName = "media-mute-button";
	}
	activate(state) {
		this.core.toggle(state);
	}
};
//#endregion
export { MuteButtonElement };
