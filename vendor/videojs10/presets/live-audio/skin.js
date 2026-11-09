import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/default-live-audio/template.js";
import skin_default from "../../define/live-audio/skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/live-audio/skin.ts
/** Packaged default live-audio UI registered as `<live-audio-skin>`. */
var LiveAudioSkinElement = class extends SkinElement {
	static {
		this.tagName = "live-audio-skin";
	}
	static {
		this.styles = createShadowStyle(skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { LiveAudioSkinElement };
