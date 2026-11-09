import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MediaButtonElement } from "../media-button-element.js";
import { AirPlayButtonCore, AirPlayButtonDataAttrs } from "@videojs/core";
import { selectRemotePlayback } from "@videojs/core/dom";
//#region src/ui/airplay-button/element.ts
var AirPlayButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.core = new AirPlayButtonCore();
		this.stateAttrMap = AirPlayButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectRemotePlayback);
	}
	static {
		this.tagName = "media-airplay-button";
	}
	activate(state) {
		return this.core.toggle(state);
	}
};
//#endregion
export { AirPlayButtonElement };
