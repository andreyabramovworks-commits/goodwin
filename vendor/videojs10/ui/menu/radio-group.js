import { RadioGroupElement } from "../radio-group/element.js";
import { menuContext } from "./context.js";
import { MenuGroupController } from "./group-controller.js";
import { MenuRadioItemElement } from "./radio-item.js";
import { ContextConsumer } from "@videojs/element/context";
import { findElementChild } from "@videojs/utils/dom";
//#region src/ui/menu/radio-group.ts
/** Group of mutually exclusive `<media-menu-radio-item>` children; the element itself takes `role="group"`. */
var MenuRadioGroupElement = class extends RadioGroupElement {
	static {
		this.tagName = "media-menu-radio-group";
	}
	#group = new MenuGroupController(this);
	#menu = new ContextConsumer(this, {
		context: menuContext,
		subscribe: true
	});
	#optionSource = Symbol("menu-option");
	#ariaLabel = null;
	#optionMenu = null;
	#setOptionState = null;
	disconnectedCallback() {
		this.#clearMenuOptionState();
		super.disconnectedCallback();
	}
	update(changed) {
		super.update(changed);
		this.#group.applyProps();
	}
	setItemLabel(item, label) {
		const labelPart = item.querySelector("[data-part~=\"label\"]");
		if (labelPart) labelPart.textContent = label;
		else item.textContent = label;
	}
	/** Applies a generated fallback without replacing an author-provided accessible name. */
	applyDefaultAriaLabel(label) {
		if (this.hasAttribute("aria-labelledby")) return;
		const current = this.getAttribute("aria-label");
		if (current !== null && current !== this.#ariaLabel) return;
		this.#ariaLabel = label;
		this.setAttribute("aria-label", label);
	}
	publishMenuOptionState(disabled, hidden, availability) {
		const context = this.#menu.value ?? null;
		if (context?.menu !== this.#optionMenu) {
			this.#clearMenuOptionState();
			this.#optionMenu = context?.menu ?? null;
			this.#setOptionState = context?.setOptionState ?? null;
		}
		if (!this.#setOptionState) return;
		const selectedItem = findElementChild(this, (item) => item instanceof MenuRadioItemElement && item.value === this.value);
		const value = selectedItem?.querySelector("[data-part~=\"label\"]")?.textContent ?? selectedItem?.textContent?.trim() ?? "";
		this.#setOptionState(this.#optionSource, {
			value,
			disabled,
			hidden,
			availability
		});
	}
	#clearMenuOptionState() {
		this.#setOptionState?.(this.#optionSource, null);
		this.#optionMenu = null;
		this.#setOptionState = null;
	}
};
//#endregion
export { MenuRadioGroupElement };
