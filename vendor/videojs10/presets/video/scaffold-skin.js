import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/scaffold-video/template.js";
import scaffold_skin_default from "../../define/video/scaffold-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/video/scaffold-skin.ts
/** Packaged scaffold video UI registered as `<video-scaffold-skin>`. */
var ScaffoldVideoSkinElement = class extends SkinElement {
	static {
		this.tagName = "video-scaffold-skin";
	}
	static {
		this.styles = createShadowStyle(scaffold_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { ScaffoldVideoSkinElement };
