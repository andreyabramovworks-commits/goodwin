import { UIElement } from "../ui-element.js";
//#region src/ui/time/group.ts
/** Container for composed `<media-time>` and `<media-time-separator>` displays. */
var TimeGroupElement = class extends UIElement {
	static {
		this.tagName = "media-time-group";
	}
};
//#endregion
export { TimeGroupElement };
