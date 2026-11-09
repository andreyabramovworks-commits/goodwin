import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/neutral-video/template.js";
import neutral_skin_default from "../../define/video/neutral-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/video/neutral-skin.ts
/** Packaged Neutral video UI registered as `<video-neutral-skin>`. */
var NeutralVideoSkinElement = class extends SkinElement {
	static {
		this.tagName = "video-neutral-skin";
	}
	static {
		this.styles = createShadowStyle(neutral_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { NeutralVideoSkinElement };
