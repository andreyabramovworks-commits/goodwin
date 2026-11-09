import { i18nContext } from "./context.js";
import { I18nController } from "./controller.js";
import { createI18nProviderMixin } from "./provider-mixin.js";
import { createTextMixin } from "./text-mixin.js";
//#region src/i18n/create-i18n.ts
function createI18n(options) {
	const ProviderMixin = createI18nProviderMixin({
		context: i18nContext,
		loader: options?.loader
	});
	const TextMixin = createTextMixin({ context: i18nContext });
	return {
		context: i18nContext,
		I18nController,
		ProviderMixin,
		TextMixin
	};
}
//#endregion
export { createI18n };
