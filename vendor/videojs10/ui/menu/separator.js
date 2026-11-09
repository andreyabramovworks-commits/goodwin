import { UIElement } from "../ui-element.js";
import { applyElementProps } from "@videojs/core/dom";
//#region src/ui/menu/separator.ts
/** Visual divider between groups of menu items; the element itself takes `role="separator"`. */
var MenuSeparatorElement = class extends UIElement {
	static {
		this.tagName = "media-menu-separator";
	}
	update(_changed) {
		super.update(_changed);
		applyElementProps(this, { role: "separator" });
	}
};
//#endregion
export { MenuSeparatorElement };
