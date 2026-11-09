import { UIElement } from "../ui/ui-element.js";
import global_default from "../define/global.js";
import shadow_default from "../define/shadow.js";
import { applyShadowStyles, createShadowStyle, ensureGlobalStyle, renderTemplate } from "@videojs/utils/dom";
//#region src/presets/skin.ts
const STYLES_ID = "__media-styles";
const shadowSheet = createShadowStyle(shadow_default);
/**
* Base element for skin definitions. Attaches a shadow root, clones `static template` into it, and applies shared +
* per-skin styles via `adoptedStyleSheets` (or `<style>` fallback). Destroying it also destroys the controls in its
* shadow root.
*/
var SkinElement = class extends UIElement {
	static {
		this.shadowRootOptions = { mode: "open" };
	}
	constructor() {
		super();
		ensureGlobalStyle(STYLES_ID, global_default);
		if (!this.shadowRoot) {
			const ctor = this.constructor;
			this.attachShadow(ctor.shadowRootOptions);
			if (ctor.template) renderTemplate(this.shadowRoot, ctor.template);
			const sheets = [shadowSheet];
			if (ctor.styles) sheets.push(ctor.styles);
			applyShadowStyles(this.shadowRoot, sheets);
		}
	}
};
//#endregion
export { SkinElement };
