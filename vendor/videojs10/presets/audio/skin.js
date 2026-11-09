import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/default-audio/template.js";
import skin_default from "../../define/audio/skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/audio/skin.ts
/** Packaged default audio UI registered as `<audio-skin>`. */
var AudioSkinElement = class extends SkinElement {
	static {
		this.tagName = "audio-skin";
	}
	static {
		this.styles = createShadowStyle(skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { AudioSkinElement };
