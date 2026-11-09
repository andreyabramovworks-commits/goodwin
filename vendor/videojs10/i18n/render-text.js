import { escapeHtml } from "@videojs/utils/string";
//#region src/i18n/render-text.ts
/**
* Render a text descriptor as keyed media-text markup.
*
* @internal
*/
function renderText(text, attrs) {
	const attrText = Object.entries(attrs ?? {}).map(([key, value]) => ` ${key}="${escapeHtml(value)}"`).join("");
	return `<media-text token="${escapeHtml(text.key)}"${attrText}>${escapeHtml(text.text)}</media-text>`;
}
//#endregion
export { renderText };
