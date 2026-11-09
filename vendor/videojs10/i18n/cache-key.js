//#region src/i18n/cache-key.ts
/** Serialize text content and parameters so dynamic labels invalidate their caches. */
function cacheKey(text, params) {
	return JSON.stringify([text, params]);
}
//#endregion
export { cacheKey };
