import { UIElement } from "../ui-element.js";
import { tooltipGroupContext } from "./context.js";
import { TooltipGroupCore } from "@videojs/core";
import { ContextProvider } from "@videojs/element/context";
//#region src/ui/tooltip/group.ts
var TooltipGroupElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.delay = TooltipGroupCore.defaultProps.delay;
		this.closeDelay = TooltipGroupCore.defaultProps.closeDelay;
		this.timeout = TooltipGroupCore.defaultProps.timeout;
		this.#core = new TooltipGroupCore();
		this.#provider = new ContextProvider(this, {
			context: tooltipGroupContext,
			initialValue: this.#core
		});
	}
	static {
		this.tagName = "media-tooltip-group";
	}
	static {
		this.properties = {
			delay: { type: Number },
			closeDelay: {
				type: Number,
				attribute: "close-delay"
			},
			timeout: { type: Number }
		};
	}
	#core;
	#provider;
	update(_changed) {
		super.update(_changed);
		this.#core.setProps(this);
		this.#provider.setValue(this.#core);
	}
};
//#endregion
export { TooltipGroupElement };
