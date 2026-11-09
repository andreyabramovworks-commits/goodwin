import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MediaButtonElement } from "../media-button-element.js";
import { CastButtonCore, CastButtonDataAttrs } from "@videojs/core";
import { selectRemotePlayback } from "@videojs/core/dom";
//#region src/ui/cast-button/element.ts
var CastButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.core = new CastButtonCore();
		this.stateAttrMap = CastButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectRemotePlayback);
	}
	static {
		this.tagName = "media-cast-button";
	}
	activate(state) {
		return this.core.toggle(state);
	}
};
//#endregion
export { CastButtonElement };
