import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MediaButtonElement } from "../media-button-element.js";
import { PlayButtonCore, PlayButtonDataAttrs } from "@videojs/core";
import { selectPlayback } from "@videojs/core/dom";
//#region src/ui/play-button/element.ts
var PlayButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.core = new PlayButtonCore();
		this.stateAttrMap = PlayButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectPlayback);
		this.hotkeyAction = "togglePaused";
	}
	static {
		this.tagName = "media-play-button";
	}
	activate(state) {
		return this.core.toggle(state);
	}
};
//#endregion
export { PlayButtonElement };
