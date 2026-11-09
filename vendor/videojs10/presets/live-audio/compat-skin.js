import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/compat-live-audio/template.js";
import compat_skin_default from "../../define/live-audio/compat-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/live-audio/compat-skin.ts
/** Packaged compat live-audio UI registered as `<live-audio-compat-skin>`. */
var CompatLiveAudioSkinElement = class extends SkinElement {
	static {
		this.tagName = "live-audio-compat-skin";
	}
	static {
		this.styles = createShadowStyle(compat_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { CompatLiveAudioSkinElement };
