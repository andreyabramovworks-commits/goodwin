import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MediaButtonElement } from "../media-button-element.js";
import { PiPButtonCore, PiPButtonDataAttrs } from "@videojs/core";
import { selectPiP } from "@videojs/core/dom";
//#region src/ui/pip-button/element.ts
var PiPButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.core = new PiPButtonCore();
		this.stateAttrMap = PiPButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectPiP);
		this.hotkeyAction = "togglePictureInPicture";
	}
	static {
		this.tagName = "media-pip-button";
	}
	activate(state) {
		return this.core.toggle(state);
	}
};
//#endregion
export { PiPButtonElement };
