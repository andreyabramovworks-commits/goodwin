import skin_default from "../../define/background/skin2.js";
import { DestroyMixin, ReactiveElement } from "@videojs/element";
import { ensureGlobalStyle } from "@videojs/utils/dom";
//#region src/presets/background/skin.ts
const STYLES_ID = "__media-background-styles";
function getTemplateHTML() {
	return `
    <media-container>
      <!-- @deprecated slot="media" is no longer required, use the default slot instead -->
      <slot name="media"></slot>
      <slot></slot>
    </media-container>
  `;
}
var BackgroundVideoSkinElement = class BackgroundVideoSkinElement extends DestroyMixin(ReactiveElement) {
	static {
		this.tagName = "background-video-skin";
	}
	static {
		this.shadowRootOptions = { mode: "open" };
	}
	static {
		this.getTemplateHTML = getTemplateHTML;
	}
	constructor() {
		super();
		ensureGlobalStyle(STYLES_ID, skin_default);
		if (!this.shadowRoot) {
			this.attachShadow(BackgroundVideoSkinElement.shadowRootOptions);
			this.shadowRoot.innerHTML = getTemplateHTML();
		}
	}
};
//#endregion
export { BackgroundVideoSkinElement };
