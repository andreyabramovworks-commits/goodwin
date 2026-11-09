import { UIElement } from "../ui-element.js";
import { MenuGroupController } from "./group-controller.js";
//#region src/ui/menu/group.ts
/**
* Groups related menu items; the element itself takes `role="group"`. A `<media-menu-group-label>` child names the
* group unless it already has an `aria-label` or `aria-labelledby`.
*/
var MenuGroupElement = class extends UIElement {
	static {
		this.tagName = "media-menu-group";
	}
	#group = new MenuGroupController(this);
	update(_changed) {
		super.update(_changed);
		this.#group.applyProps();
	}
};
//#endregion
export { MenuGroupElement };
