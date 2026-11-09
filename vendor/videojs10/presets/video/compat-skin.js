import { template } from "../../internal/skins/compat-video/template.js";
import { SkinElement } from "../skin.js";
import compat_skin_default from "../../define/video/compat-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/video/compat-skin.ts
/** Packaged compat video UI registered as `<video-compat-skin>`. */
var CompatVideoSkinElement = class extends SkinElement {
	static {
		this.tagName = "video-compat-skin";
	}
	static {
		this.styles = createShadowStyle(compat_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { CompatVideoSkinElement };
