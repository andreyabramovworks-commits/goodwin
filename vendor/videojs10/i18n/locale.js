import { effectiveLocale, nearestLang, resolveLangAttr } from "@videojs/utils/dom";
//#region src/i18n/locale.ts
/**
* Delegates to {@link effectiveLocale}; result is typed as {@link Locale} for player UI.
*
* @internal
*/
function resolvePlayerLocale(explicit, inherited) {
	return effectiveLocale(explicit, inherited);
}
/**
* Effective locale for an i18n provider element (explicit `lang` → ancestor `lang` chain → `en`).
*
* @internal
*/
function resolveProviderLocale(host) {
	const explicit = resolveLangAttr(host.lang);
	const root = host.parentElement ?? (typeof document !== "undefined" ? document.documentElement : null);
	return resolvePlayerLocale(explicit, resolveLangAttr(nearestLang(root)));
}
//#endregion
export { resolvePlayerLocale, resolveProviderLocale };
