import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/neutral-audio/template.js";
import neutral_skin_default from "../../define/audio/neutral-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/audio/neutral-skin.ts
/** Packaged Neutral audio UI registered as `<audio-neutral-skin>`. */
var NeutralAudioSkinElement = class extends SkinElement {
	static {
		this.tagName = "audio-neutral-skin";
	}
	static {
		this.styles = createShadowStyle(neutral_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { NeutralAudioSkinElement };
