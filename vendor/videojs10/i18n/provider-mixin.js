import { getFallbackTranslator } from "./controller.js";
import { resolveProviderLocale } from "./locale.js";
import { ContextProvider } from "@videojs/element/context";
import { DEFAULT_LOCALE, createTranslator, findLocaleKeys, getBrowserTranslations, getI18nTranslations, loadLocale, onI18nRegistryChange, registerI18n, shouldAttemptBrowserTranslation } from "@videojs/core/i18n";
import { mergeLocaleOverlays, subscribeAmbientLang } from "@videojs/utils/dom";
import { getTextDirection } from "@videojs/utils/i18n";
//#region src/i18n/provider-mixin.ts
function createI18nProviderMixin({ context, loader = loadLocale }) {
	return (Base) => {
		class I18nProviderElement extends Base {
			constructor(..._args) {
				super(..._args);
				this.lang = "";
				this.dir = "";
				this.#i18nProvider = new ContextProvider(this, {
					context,
					initialValue: {
						translator: getFallbackTranslator(),
						locale: DEFAULT_LOCALE
					}
				});
				this.#registryEpoch = 0;
				this.#lazyLayer = {};
				this.#lazySeq = 0;
				this.#i18nValue = {
					translator: getFallbackTranslator(),
					locale: DEFAULT_LOCALE
				};
				this.#publishedRegistryEpoch = -1;
			}
			static {
				this.properties = {
					...Base.properties,
					lang: {
						type: String,
						reflect: true
					},
					dir: {
						type: String,
						reflect: true
					}
				};
			}
			#i18nProvider;
			#registryUnsubscribe;
			#ambientUnsubscribe;
			#registryEpoch;
			#lazyLayer;
			#lazySeq;
			/** Tracks locale used for `#lazyLayer`; ambient `lang` can change without the `lang` property. */
			#resolvedLocaleForLazy;
			/** Locale snapshot when the current `#lazySeq` async load was started (see `willUpdate` drift guard). */
			#lazyResetStartedForLocale;
			#i18nValue;
			#publishedLocale;
			#publishedRegistryEpoch;
			#publishedLazyLayer;
			#derivedDirection;
			get i18nValue() {
				return this.#i18nValue;
			}
			connectedCallback() {
				super.connectedCallback();
				this.#registryUnsubscribe = onI18nRegistryChange(() => {
					this.#registryEpoch += 1;
					this.requestUpdate();
				});
				this.#ambientUnsubscribe = subscribeAmbientLang(() => this.requestUpdate());
				this.#resetLazyAndLoad();
				this.#publish();
				this.requestUpdate();
			}
			disconnectedCallback() {
				super.disconnectedCallback();
				this.#registryUnsubscribe?.();
				this.#registryUnsubscribe = void 0;
				this.#ambientUnsubscribe?.();
				this.#ambientUnsubscribe = void 0;
				this.#lazySeq += 1;
				this.#lazyLayer = {};
				this.#resolvedLocaleForLazy = void 0;
				this.#lazyResetStartedForLocale = void 0;
			}
			willUpdate(changed) {
				super.willUpdate(changed);
				const locale = resolveProviderLocale(this);
				if (this.#resolvedLocaleForLazy !== locale) {
					const hadLocale = this.#resolvedLocaleForLazy !== void 0;
					this.#resolvedLocaleForLazy = locale;
					const localeDriftedBeforeFirstPaint = !hadLocale && this.#lazyResetStartedForLocale !== void 0 && locale !== this.#lazyResetStartedForLocale;
					if (hadLocale || localeDriftedBeforeFirstPaint) this.#resetLazyAndLoad();
				}
				this.#syncDirection(locale);
				this.#publish();
			}
			#resetLazyAndLoad() {
				const localeSnapshot = resolveProviderLocale(this);
				this.#lazyResetStartedForLocale = localeSnapshot;
				this.#lazySeq += 1;
				const seq = this.#lazySeq;
				this.#lazyLayer = {};
				(async () => {
					try {
						const { merged, loadedTags } = await mergeLocaleOverlays(localeSnapshot, loader, findLocaleKeys);
						if (seq !== this.#lazySeq) return;
						if (shouldAttemptBrowserTranslation(localeSnapshot, loadedTags, merged)) {
							const browser = await getBrowserTranslations(localeSnapshot);
							if (seq !== this.#lazySeq) return;
							if (Object.keys(browser).length) registerI18n(localeSnapshot, browser);
						}
						if (seq !== this.#lazySeq) return;
						this.#lazyLayer = merged;
						this.requestUpdate();
					} catch {}
				})();
			}
			#resolvedLocale() {
				return resolveProviderLocale(this);
			}
			#syncDirection(locale) {
				const current = this.dir.trim().toLowerCase();
				const isDerived = this.#derivedDirection !== void 0 && current === this.#derivedDirection;
				if (!this.lang.trim()) {
					if (isDerived) this.dir = "";
					this.#derivedDirection = void 0;
					return;
				}
				if (current && !isDerived) {
					this.#derivedDirection = void 0;
					return;
				}
				const direction = getTextDirection(locale);
				this.#derivedDirection = direction;
				if (this.dir !== direction) this.dir = direction;
			}
			#publish() {
				const locale = this.#resolvedLocale();
				if (this.#publishedLocale === locale && this.#publishedRegistryEpoch === this.#registryEpoch && this.#publishedLazyLayer === this.#lazyLayer) return;
				const registryLayer = getI18nTranslations(locale);
				const translations = {
					...this.#lazyLayer,
					...registryLayer
				};
				const translator = createTranslator(translations, locale);
				this.#i18nValue = {
					translator,
					locale
				};
				this.#publishedLocale = locale;
				this.#publishedRegistryEpoch = this.#registryEpoch;
				this.#publishedLazyLayer = this.#lazyLayer;
				this.#i18nProvider.setValue(this.#i18nValue);
			}
		}
		return I18nProviderElement;
	};
}
//#endregion
export { createI18nProviderMixin };
