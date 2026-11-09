import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/compat-live-video/template.js";
import compat_skin_default from "../../define/live-video/compat-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/live-video/compat-skin.ts
/** Packaged compat live-video UI registered as `<live-video-compat-skin>`. */
var CompatLiveVideoSkinElement = class extends SkinElement {
	static {
		this.tagName = "live-video-compat-skin";
	}
	static {
		this.styles = createShadowStyle(compat_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { CompatLiveVideoSkinElement };
