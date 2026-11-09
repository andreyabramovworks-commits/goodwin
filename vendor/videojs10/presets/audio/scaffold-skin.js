import { SkinElement } from "../skin.js";
import { template } from "../../internal/skins/scaffold-audio/template.js";
import scaffold_skin_default from "../../define/audio/scaffold-skin2.js";
import { createShadowStyle } from "@videojs/utils/dom";
//#region src/presets/audio/scaffold-skin.ts
/** Packaged scaffold audio UI registered as `<audio-scaffold-skin>`. */
var ScaffoldAudioSkinElement = class extends SkinElement {
	static {
		this.tagName = "audio-scaffold-skin";
	}
	static {
		this.styles = createShadowStyle(scaffold_skin_default);
	}
	static {
		this.template = template;
	}
};
//#endregion
export { ScaffoldAudioSkinElement };
