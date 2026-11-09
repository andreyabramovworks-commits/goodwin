import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/default-live-video/template.js";
import skin_default from "../../define/live-video/skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/live-video/skin.ts
/** Packaged default live-video UI registered as `<live-video-skin>`. */
var LiveVideoSkinElement = class extends SkinElement {
	static {
		this.tagName = "live-video-skin";
	}
	static {
		this.styles = createShadowStyle(skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { LiveVideoSkinElement };
