import { containerContext } from "../../player/context.js";
import { getHotkeyCoordinator } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/hotkey/aria-key-shortcuts-controller.ts
/** Provides hotkey shortcut metadata for a given hotkey action name. */
var AriaKeyShortcutsController = class {
	#host;
	#action;
	#getValue;
	#container;
	#unsubscribe = null;
	/**
	* @param host - Host element whose nearest player container supplies hotkey registrations.
	* @param action - Registered hotkey action to look up.
	* @param options - Optional value resolver for value-dependent shortcuts.
	*/
	constructor(host, action, options = {}) {
		this.#host = host;
		this.#action = action;
		this.#getValue = options.value;
		this.#container = new ContextConsumer(host, {
			context: containerContext,
			callback: (ctx) => this.#connect(ctx?.container),
			subscribe: true
		});
		host.addController(this);
	}
	get value() {
		return this.aria;
	}
	get aria() {
		return this.details.aria;
	}
	get shortcut() {
		return this.details.shortcut;
	}
	get details() {
		const container = this.#container.value?.container;
		if (!container) return {};
		return getHotkeyCoordinator(container).getShortcut(this.#action, this.#getValue?.());
	}
	hostConnected() {
		this.#connect(this.#container.value?.container);
	}
	hostDisconnected() {
		this.#disconnect();
	}
	#connect(container) {
		this.#disconnect();
		if (!container) return;
		const coordinator = getHotkeyCoordinator(container);
		const notify = () => {
			this.#host.requestUpdate();
		};
		this.#unsubscribe = coordinator.subscribeShortcutChanges(notify);
		notify();
	}
	#disconnect() {
		this.#unsubscribe?.();
		this.#unsubscribe = null;
	}
};
//#endregion
export { AriaKeyShortcutsController };
