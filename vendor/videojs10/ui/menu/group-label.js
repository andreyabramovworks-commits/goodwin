import { UIElement } from "../ui-element.js";
import { menuGroupContext } from "./context.js";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/menu/group-label.ts
let idCounter = 0;
/** Non-interactive label that names its enclosing `<media-menu-group>` or `<media-menu-radio-group>`. */
var MenuGroupLabelElement = class extends UIElement {
	static {
		this.tagName = "media-menu-group-label";
	}
	#groupCtx = new ContextConsumer(this, {
		context: menuGroupContext,
		subscribe: true
	});
	#generatedId = `vjs-menu-group-label-${idCounter++}`;
	#cleanupRegistration = null;
	#registeredId = null;
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#cleanupRegistration?.();
		this.#cleanupRegistration = null;
		this.#registeredId = null;
	}
	update(_changed) {
		super.update(_changed);
		if (!this.id) this.id = this.#generatedId;
		this.#registerLabel();
	}
	#registerLabel() {
		const groupCtx = this.#groupCtx.value;
		if (!groupCtx) {
			this.#cleanupRegistration?.();
			this.#cleanupRegistration = null;
			this.#registeredId = null;
			return;
		}
		if (this.#registeredId === this.id) return;
		this.#cleanupRegistration?.();
		this.#registeredId = this.id;
		this.#cleanupRegistration = groupCtx.registerLabel(this.id);
	}
};
//#endregion
export { MenuGroupLabelElement };
