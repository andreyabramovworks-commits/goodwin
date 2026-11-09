import { containerContext, playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { getRenderedIndicatorState, isIndicatorPresent } from "@videojs/core";
import { getIndicatorVisibilityCoordinator, getMediaSnapshot, subscribeToInputActions } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/input-indicator/element.ts
var InputIndicatorElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.player = new PlayerController(this, playerContext);
		this.container = new ContextConsumer(this, {
			context: containerContext,
			callback: () => this.#reconnect(),
			subscribe: true
		});
		this.#disconnect = null;
		this.#inputActionUnsubscribe = null;
		this.#visibilityUnsubscribe = null;
		this.#visibilityHandle = null;
		this.#lastGeneration = 0;
		this.#snapshot = null;
	}
	get options() {
		return {};
	}
	#disconnect;
	#inputActionUnsubscribe;
	#visibilityUnsubscribe;
	#visibilityHandle;
	#lastGeneration;
	#snapshot;
	#getVisibilityHandle() {
		return this.#visibilityHandle ??= { close: () => this.core.close() };
	}
	#payloadSnapshot() {
		return this.#snapshot ?? this.core.state.current;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#snapshot = this.core.state.current;
		this.#disconnect = new AbortController();
		this.core.state.subscribe(() => this.requestUpdate(), { signal: this.#disconnect.signal });
		this.transition.state.subscribe(() => this.requestUpdate(), { signal: this.#disconnect.signal });
		this.hidden = true;
		this.#reconnect();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#inputActionUnsubscribe?.();
		this.#visibilityUnsubscribe?.();
		this.#inputActionUnsubscribe = null;
		this.#visibilityUnsubscribe = null;
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	destroyCallback() {
		this.#inputActionUnsubscribe?.();
		this.#visibilityUnsubscribe?.();
		this.core.destroy();
		this.transition.destroy();
		this.liveIndicator.remove();
		super.destroyCallback();
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.syncCoreProps();
	}
	update(changed) {
		super.update(changed);
		this.#syncTransition();
		const currentState = this.core.state.current;
		const transitionState = this.transition.state.current;
		if (!isIndicatorPresent(currentState, transitionState)) {
			this.liveIndicator.remove();
			return;
		}
		const state = getRenderedIndicatorState(currentState, this.#payloadSnapshot(), transitionState);
		this.liveIndicator.render(state);
	}
	#syncTransition() {
		const currentState = this.core.state.current;
		if (currentState.open) {
			this.#snapshot = currentState;
			if (this.#lastGeneration !== currentState.generation) {
				this.#lastGeneration = currentState.generation;
				const transitionState = this.transition.state.current;
				if (!transitionState.active || this.options.replayOnUpdate !== false) this.transition.open(this.liveIndicator.element);
				else if (transitionState.status === "ending") this.transition.cancel();
			}
			return;
		}
		const { active, status } = this.transition.state.current;
		if (active && status !== "ending") this.transition.close(this.liveIndicator.element);
	}
	#reconnect() {
		if (!this.container) return;
		this.#inputActionUnsubscribe?.();
		this.#visibilityUnsubscribe?.();
		this.#inputActionUnsubscribe = null;
		this.#visibilityUnsubscribe = null;
		const container = this.container.value?.container;
		if (!container) return;
		const visibility = getIndicatorVisibilityCoordinator(container);
		const visibilityHandle = this.#getVisibilityHandle();
		this.#visibilityUnsubscribe = visibility.register(visibilityHandle);
		this.#inputActionUnsubscribe = subscribeToInputActions(container, (event) => {
			if (this.core.processEvent(event, getMediaSnapshot(this.player.value))) visibility.show(visibilityHandle);
		});
	}
};
//#endregion
export { InputIndicatorElement };
