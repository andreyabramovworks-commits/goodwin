import { createContext } from "@videojs/element/context";
//#region src/i18n/context.ts
const I18N_CONTEXT_KEY = Symbol.for("@videojs/i18n");
/**
* The default HTML context carrying the active translator and locale.
*
* @public
*/
const i18nContext = createContext(I18N_CONTEXT_KEY);
//#endregion
export { I18N_CONTEXT_KEY, i18nContext };
