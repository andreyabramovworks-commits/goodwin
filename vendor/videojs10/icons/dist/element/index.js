import { MediaIconElement } from "./base.js";
//#region ../icons/dist/element/index.js
if (typeof customElements !== "undefined" && typeof HTMLElement !== "undefined") {
	const mediaIconElement = customElements.get("media-icon") || MediaIconElement;
	mediaIconElement.registerLoader?.("compat", () => import("./compat/icons.js").then(({ icons }) => icons));
	mediaIconElement.registerLoader?.("default", () => import("./default/icons.js").then(({ icons }) => icons));
	mediaIconElement.registerLoader?.("neutral", () => import("./neutral/icons.js").then(({ icons }) => icons));
	mediaIconElement.registerLoader?.("scaffold", () => import("./scaffold/icons.js").then(({ icons }) => icons));
	if (!customElements.get("media-icon")) customElements.define("media-icon", MediaIconElement);
}
//#endregion
