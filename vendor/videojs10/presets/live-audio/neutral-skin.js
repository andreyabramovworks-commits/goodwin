import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/neutral-live-audio/template.js";
import neutral_skin_default from "../../define/live-audio/neutral-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/live-audio/neutral-skin.ts
/** Packaged Neutral live-audio UI registered as `<live-audio-neutral-skin>`. */
var NeutralLiveAudioSkinElement = class extends SkinElement {
	static {
		this.tagName = "live-audio-neutral-skin";
	}
	static {
		this.styles = createShadowStyle(neutral_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { NeutralLiveAudioSkinElement };
