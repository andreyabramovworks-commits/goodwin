import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/compat-audio/template.js";
import compat_skin_default from "../../define/audio/compat-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/audio/compat-skin.ts
/** Packaged compat audio UI registered as `<audio-compat-skin>`. */
var CompatAudioSkinElement = class extends SkinElement {
	static {
		this.tagName = "audio-compat-skin";
	}
	static {
		this.styles = createShadowStyle(compat_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { CompatAudioSkinElement };
