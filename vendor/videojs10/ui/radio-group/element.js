import { UIElement } from "../ui-element.js";
import { radioGroupContext } from "./context.js";
import { ContextProvider } from "@videojs/element/context";
//#region src/ui/radio-group/element.ts
/** @fires value-change - Fired when the selected value changes. */
var RadioGroupElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.#provider = new ContextProvider(this, { context: radioGroupContext });
	}
	static {
		this.properties = { value: { type: String } };
	}
	#provider;
	update(changed) {
		super.update(changed);
		this.#provider.setValue({
			value: this.value,
			onValueChange: (next) => {
				this.value = next;
				this.dispatchEvent(new CustomEvent("value-change", {
					detail: { value: next },
					bubbles: true
				}));
			}
		});
	}
};
//#endregion
export { RadioGroupElement };
