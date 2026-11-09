import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { containerContext, playerContext } from "../../player/context.js";
import { UIElement } from "../ui-element.js";
import { StatusAnnouncerCore, createStatusAnnouncerLabels } from "@videojs/core";
import { shouldAnnounceStatusChange, subscribeToStatusAnnouncer } from "@videojs/core/dom";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/status-announcer/element.ts
var StatusAnnouncerElement = class extends UIElement {
	static {
		this.tagName = "media-status-announcer";
	}
	static {
		this.properties = { closeDelay: {
			type: Number,
			attribute: "close-delay"
		} };
	}
	#i18n = new I18nController(this, i18nContext);
	#core = new StatusAnnouncerCore();
	#storeUnsubscribe = null;
	#player = new ContextConsumer(this, {
		context: playerContext,
		callback: (store) => this.#reconnect(store),
		subscribe: true
	});
	#container = new ContextConsumer(this, {
		context: containerContext,
		subscribe: true
	});
	#disconnect = null;
	#liveText = null;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.setAttribute("role", "status");
		this.#ensureLiveText();
		this.#disconnect = new AbortController();
		this.#core.state.subscribe(() => this.requestUpdate(), { signal: this.#disconnect.signal });
		this.#reconnect();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#storeUnsubscribe?.();
		this.#storeUnsubscribe = null;
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	destroyCallback() {
		this.#storeUnsubscribe?.();
		this.#core.destroy();
		super.destroyCallback();
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.#core.setProps({
			closeDelay: this.closeDelay,
			labels: createStatusAnnouncerLabels(this.#i18n.value, this.#i18n.locale),
			shouldAnnounce: () => shouldAnnounceStatusChange(this.#container.value?.container)
		});
	}
	update(changed) {
		super.update(changed);
		const label = this.#core.state.current.label;
		const liveText = this.#ensureLiveText();
		if (label === null) liveText.replaceChildren();
		else liveText.replaceChildren(document.createTextNode(label));
	}
	#reconnect(store = this.#player.value) {
		this.#storeUnsubscribe?.();
		this.#storeUnsubscribe = null;
		if (!store) {
			this.#core.resetSnapshot();
			return;
		}
		this.#storeUnsubscribe = subscribeToStatusAnnouncer(store, this.#core);
	}
	#ensureLiveText() {
		if (this.#liveText?.isConnected) return this.#liveText;
		const existing = this.querySelector("[data-status-announcer-content]");
		this.#liveText = existing ?? document.createElement("span");
		this.#liveText.setAttribute("data-status-announcer-content", "");
		if (!existing) this.append(this.#liveText);
		return this.#liveText;
	}
};
//#endregion
export { StatusAnnouncerElement };
