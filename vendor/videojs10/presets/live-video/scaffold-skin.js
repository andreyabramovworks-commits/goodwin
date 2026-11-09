import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/scaffold-live-video/template.js";
import scaffold_skin_default from "../../define/live-video/scaffold-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/live-video/scaffold-skin.ts
/** Packaged scaffold live-video UI registered as `<live-video-scaffold-skin>`. */
var ScaffoldLiveVideoSkinElement = class extends SkinElement {
	static {
		this.tagName = "live-video-scaffold-skin";
	}
	static {
		this.styles = createShadowStyle(scaffold_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { ScaffoldLiveVideoSkinElement };
