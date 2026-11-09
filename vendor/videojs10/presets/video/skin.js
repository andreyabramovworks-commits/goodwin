import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/default-video/template.js";
import skin_default from "../../define/video/skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/video/skin.ts
/** Packaged default video UI registered as `<video-skin>`. */
var VideoSkinElement = class extends SkinElement {
	static {
		this.tagName = "video-skin";
	}
	static {
		this.styles = createShadowStyle(skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { VideoSkinElement };
