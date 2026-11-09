import { MediaIconElement } from "../base.js";
import { icons } from "./icons.js";
//#region ../icons/dist/element/scaffold/index.js
if (typeof customElements !== "undefined" && typeof HTMLElement !== "undefined") {
	(customElements.get("media-icon") || MediaIconElement).register?.("scaffold", icons);
	if (!customElements.get("media-icon")) customElements.define("media-icon", MediaIconElement);
}
//#endregion
