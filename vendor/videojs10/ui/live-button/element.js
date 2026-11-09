import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { LiveButtonCore, LiveButtonDataAttrs } from "@videojs/core";
import { applyElementProps, applyStateDataAttrs, createButton, selectBuffer, selectLive, selectTime } from "@videojs/core/dom";
import { resolveText, translateText } from "@videojs/core/i18n";
//#region src/ui/live-button/element.ts
/**
* `<media-live-button>` — selects from `live`, `time`, and `buffer` features and composes them into the
* `LiveButtonMediaState` consumed by `LiveButtonCore`.
*
* Doesn't extend `MediaButtonElement` because that base couples a button to a single feature selector; the LiveButton
* needs three.
*/
var LiveButtonElement = class extends UIElement {
	constructor(..._args) {
		super(..._args);
		this.disabled = false;
		this.label = "";
		this.core = new LiveButtonCore();
		this.live = new PlayerController(this, playerContext, selectLive);
		this.time = new PlayerController(this, playerContext, selectTime);
		this.buffer = new PlayerController(this, playerContext, selectBuffer);
		this.#i18n = new I18nController(this, i18nContext);
		this.#defaultContent = false;
		this.#disconnect = null;
	}
	static {
		this.tagName = "media-live-button";
	}
	static {
		this.properties = {
			label: { type: String },
			disabled: { type: Boolean }
		};
	}
	#i18n;
	get $state() {
		return this.core.state;
	}
	#defaultContent;
	#disconnect;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#defaultContent ||= !this.textContent?.trim();
		if (this.#defaultContent) this.textContent = translateText(LiveButtonCore.defaultText, this.#i18n.value);
		this.#disconnect = new AbortController();
		const buttonProps = createButton({
			onActivate: () => {
				const media = this.#getMedia();
				if (media) this.core.seekToLive(media);
			},
			isDisabled: () => this.disabled || !this.#getMedia()
		});
		applyElementProps(this, buttonProps, { signal: this.#disconnect.signal });
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#disconnect?.abort();
		this.#disconnect = null;
	}
	/** Returns the button's current label derived from media state. */
	getLabel() {
		return this.core.state.current.label ? resolveText(this.core.state.current.label) : void 0;
	}
	/** Resolved label for tooltips and other display surfaces. */
	getResolvedLabel() {
		if (!this.#getMedia()) return void 0;
		const state = this.core.getState();
		return translateText(this.core.getLabel(state), this.#i18n.value);
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		this.core.setProps(this);
	}
	update(changed) {
		super.update(changed);
		if (this.#defaultContent) this.textContent = translateText(LiveButtonCore.defaultText, this.#i18n.value);
		const media = this.#getMedia();
		if (!media) return;
		this.core.setMedia(media);
		const state = this.core.getState();
		const attrs = this.core.getAttrs(state);
		applyElementProps(this, {
			...attrs,
			"aria-label": translateText(attrs["aria-label"], this.#i18n.value)
		});
		applyStateDataAttrs(this, state, LiveButtonDataAttrs);
	}
	/**
	* Compose the LiveButton media state from the three feature slices. Returns `null` when any are missing so the button
	* stays disabled until all three features are registered on the player.
	*/
	#getMedia() {
		const live = this.live.value;
		const time = this.time.value;
		const buffer = this.buffer.value;
		if (!live || !time || !buffer) return null;
		return {
			currentTime: time.currentTime,
			seek: time.seek,
			seekable: buffer.seekable,
			liveEdgeStart: live.liveEdgeStart,
			targetLiveWindow: live.targetLiveWindow
		};
	}
};
//#endregion
export { LiveButtonElement };
