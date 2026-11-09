import { containerContext, playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { createDoubleTapGesture, createTapGesture, getGestureActionValue, resolveGestureAction } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/gesture/element.ts
var GestureElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.type = "";
		this.action = "";
		this.value = void 0;
		this.pointer = void 0;
		this.region = void 0;
		this.disabled = false;
		this.#player = new PlayerController(this, playerContext);
		this.#container = new ContextConsumer(this, {
			context: containerContext,
			callback: () => this.requestUpdate(),
			subscribe: true
		});
		this.#cleanup = null;
	}
	static {
		this.tagName = "media-gesture";
	}
	static {
		this.properties = {
			type: { type: String },
			action: { type: String },
			value: { type: Number },
			pointer: { type: String },
			region: { type: String },
			disabled: { type: Boolean }
		};
	}
	#player;
	#container;
	#cleanup;
	connectedCallback() {
		super.connectedCallback();
		this.style.display = "none";
		this.#register();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#unregister();
	}
	update(changed) {
		super.update(changed);
		if (this.isConnected) {
			this.#unregister();
			this.#register();
		}
	}
	#register() {
		const store = this.#player.value;
		const container = this.#container.value?.container;
		if (!this.type || !this.action || !store || !container) return;
		const resolver = resolveGestureAction(this.action);
		if (!resolver) return;
		const { value, region } = this;
		const actionValue = getGestureActionValue(this.action, region, value);
		let state;
		const onActivate = (event) => {
			resolver({
				store,
				state,
				value: actionValue,
				event
			});
		};
		const options = {
			onPointerDown: () => state = store.state,
			pointer: this.pointer,
			region,
			disabled: this.disabled,
			action: this.action,
			value: actionValue
		};
		if (this.type === "doubletap") this.#cleanup = createDoubleTapGesture(container, onActivate, options);
		else if (this.type === "tap") this.#cleanup = createTapGesture(container, onActivate, options);
	}
	#unregister() {
		this.#cleanup?.();
		this.#cleanup = null;
	}
};
//#endregion
export { GestureElement };
