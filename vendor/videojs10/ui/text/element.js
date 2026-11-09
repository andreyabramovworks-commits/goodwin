import { i18nContext } from "../../i18n/context.js";
import { createTextMixin } from "../../i18n/text-mixin.js";
import { ReactiveElement } from "@videojs/element";
//#region src/ui/text/element.ts
/** @internal */
const I18nTextMixin = createTextMixin({ context: i18nContext });
var TextElement = class extends I18nTextMixin(ReactiveElement) {
	static {
		this.tagName = "media-text";
	}
};
//#endregion
export { I18nTextMixin, TextElement as MediaTextElement, TextElement };
