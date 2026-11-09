import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MediaButtonElement } from "../media-button-element.js";
import { SeekButtonCore, SeekButtonDataAttrs } from "@videojs/core";
import { selectTime } from "@videojs/core/dom";
//#region src/ui/seek-button/element.ts
var SeekButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.seconds = SeekButtonCore.defaultProps.seconds;
		this.core = new SeekButtonCore();
		this.stateAttrMap = SeekButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectTime);
		this.hotkeyAction = "seekStep";
	}
	static {
		this.tagName = "media-seek-button";
	}
	static {
		this.properties = {
			...MediaButtonElement.properties,
			seconds: { type: Number }
		};
	}
	get hotkeyValue() {
		return this.seconds;
	}
	activate(state) {
		this.core.seek(state);
	}
};
//#endregion
export { SeekButtonElement };
