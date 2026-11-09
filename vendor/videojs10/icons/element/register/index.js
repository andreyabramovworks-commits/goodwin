import { MediaIconElement } from "../../dist/element/base.js";
import { isFunction } from "@videojs/utils/predicate";
//#region src/icons/element/register/index.ts
/** Register an exact set of SVGs for generated source that renders `<media-icon>`. */
function registerIcons(family, icons) {
	const customElementRegistry = globalThis.customElements;
	const registeredElement = customElementRegistry?.get("media-icon");
	if (registeredElement && !supportsIconRegistration(registeredElement)) throw new Error("The registered <media-icon> element does not support icon registration.");
	(registeredElement ?? MediaIconElement).register(family, icons);
	if (customElementRegistry && globalThis.HTMLElement && !registeredElement) customElementRegistry.define("media-icon", MediaIconElement);
}
function supportsIconRegistration(element) {
	return "register" in element && isFunction(element.register);
}
//#endregion
export { registerIcons };
