import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/neutral-live-video/template.js";
import neutral_skin_default from "../../define/live-video/neutral-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/live-video/neutral-skin.ts
/** Packaged Neutral live-video UI registered as `<live-video-neutral-skin>`. */
var NeutralLiveVideoSkinElement = class extends SkinElement {
	static {
		this.tagName = "live-video-neutral-skin";
	}
	static {
		this.styles = createShadowStyle(neutral_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { NeutralLiveVideoSkinElement };
