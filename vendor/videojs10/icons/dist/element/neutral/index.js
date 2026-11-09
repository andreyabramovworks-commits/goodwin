import { MediaIconElement } from "../base.js";
import { icons } from "./icons.js";
//#region ../icons/dist/element/neutral/index.js
if (typeof customElements !== "undefined" && typeof HTMLElement !== "undefined") {
	(customElements.get("media-icon") || MediaIconElement).register?.("neutral", icons);
	if (!customElements.get("media-icon")) customElements.define("media-icon", MediaIconElement);
}
//#endregion
