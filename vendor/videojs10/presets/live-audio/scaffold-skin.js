import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/scaffold-live-audio/template.js";
import scaffold_skin_default from "../../define/live-audio/scaffold-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/live-audio/scaffold-skin.ts
/** Packaged scaffold live-audio UI registered as `<live-audio-scaffold-skin>`. */
var ScaffoldLiveAudioSkinElement = class extends SkinElement {
	static {
		this.tagName = "live-audio-scaffold-skin";
	}
	static {
		this.styles = createShadowStyle(scaffold_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { ScaffoldLiveAudioSkinElement };
