import { i18nContext } from "./context.js";
import { createI18nProviderMixin } from "./provider-mixin.js";
import { ReactiveElement } from "@videojs/element";
//#region src/i18n/provider-element.ts
/** @internal */
const I18nProviderMixin = createI18nProviderMixin({ context: i18nContext });
var I18nProviderElement = class extends I18nProviderMixin(ReactiveElement) {
	static {
		this.tagName = "media-i18n";
	}
};
//#endregion
export { I18nProviderElement, I18nProviderElement as MediaI18nProviderElement, I18nProviderMixin };
