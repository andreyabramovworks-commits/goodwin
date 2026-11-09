import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { getTemplateHTML } from "../background-video/template.js";
import { namedNodeMapToObject } from "@videojs/utils/dom";
import { HlsBackgroundVideoAdapter } from "@videojs/spf/adapters/hls-background-video";
//#region src/media/hls-background-video/adapter.ts
const HTMLElementBase = globalThis.HTMLElement ?? class {};
const HlsBackgroundVideoBase = MediaAttachMixin(HTMLElementBase);
/**
* A muted, looping, chrome-less video over the SPF background-video engine.
*
* The SPF-backed counterpart to `<background-video>`, which plays its source natively. This one streams HLS through the
* engine, which pins a single rendition for the session rather than adapting, and drops audio and text handling
* entirely — the shape an ambient hero video actually wants.
*
* Nearer an image than a player, and `src` is the whole surface. Replaces the standalone `mux-background-video`
* package, whose `audio`, `debug`, `preload`, and `max-resolution` attributes are all deliberately absent. Capping
* which rendition is fetched is a delivery param on the URL — `?max_resolution=720p` on a Mux stream, for one — which
* keeps the renditions it excludes out of the manifest rather than merely unpicked; `preload` would have nothing to
* say, since the engine loads from the moment it has a source. And unlike `<background-video>` there are no `nomuted` /
* `noloop` / `noautoplay` opt-outs: those three are what this element is for, so the adapter fixes them on at attach.
*
* Takes no structured `source` — `src` is an HLS URL, as the package it replaces required. Mux playback-ID identity,
* poster, and storyboard belong to `<mux-video>`; none of them mean anything without controls to hang them on.
*
* Nothing about an unplayable source reaches the inner `<video>` on its own, so `error` on it stays null and the
* element sits at `readyState 0`. The engine reports each condition and logs it, the Media promotes the fatal one, and
* this element re-fires it as its own `error` / `'error'` — the one place a consumer holding the element can see a
* source that never appears.
*
* @example
*   ```html
*   <hls-background-video src="https://stream.mux.com/PLAYBACK_ID.m3u8?max_resolution=720p">
*   <img src="https://image.mux.com/PLAYBACK_ID/thumbnail.webp?time=0" alt="" />
*   </hls-background-video>
*   ```;
*
* @fires error - Fired when a fatal condition is reported. Read `error` for it.
*
*   `<mux-background-video>` is this element under the name the package it replaces used. Same class, so the tag is a
*   naming choice and nothing more.
*/
var HlsBackgroundVideo = class extends HlsBackgroundVideoBase {
	static {
		this.shadowRootOptions = { mode: "open" };
	}
	static {
		this.getTemplateHTML = getTemplateHTML;
	}
	static get observedAttributes() {
		return ["src"];
	}
	#media = new HlsBackgroundVideoAdapter();
	constructor() {
		super();
		if (!this.shadowRoot) {
			this.attachShadow(this.constructor.shadowRootOptions);
			const attrs = {
				...namedNodeMapToObject(this.attributes),
				muted: "",
				loop: "",
				autoplay: "",
				playsinline: "",
				disableremoteplayback: "",
				disablepictureinpicture: ""
			};
			this.shadowRoot.innerHTML = getTemplateHTML(attrs);
		}
		const video = this.video;
		if (video) this.#media.attach(video);
		this.#media.addEventListener("error", () => this.dispatchEvent(new Event("error")));
	}
	/** Register the Media (not the inner `<video>`) with the provider. */
	getMediaTarget() {
		return this.#media;
	}
	/**
	* The Media driving the inner `<video>`, matching `adapter` on `CustomMediaElement`. Call `adapter.destroy()` to
	* release the engine after `keep-alive` kept it running past removal.
	*/
	get adapter() {
		return this.#media;
	}
	disconnectedCallback() {
		super.disconnectedCallback?.();
		if (this.hasAttribute("keep-alive")) return;
		queueMicrotask(() => {
			if (!this.isConnected) this.#media.destroy();
		});
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		if (name === "src") this.src = newValue ?? "";
	}
	/** The inner `<video>` the engine renders into. */
	get video() {
		const video = this.shadowRoot?.querySelector("video");
		return video instanceof HTMLVideoElement ? video : null;
	}
	/**
	* What made the current source unplayable, or `null`. An SVTA code rather than a `MediaError` one — 99001 where this
	* player has no pipeline for what the source needs, with the specifics logged. Reset by a new source, and not on the
	* inner `<video>`, which never learns of it.
	*/
	get error() {
		return this.#media.error;
	}
	/** HLS manifest URL. Assigning a new one restarts playback from scratch. */
	get src() {
		return this.#media.src;
	}
	set src(value) {
		this.#media.src = value;
	}
};
//#endregion
export { HlsBackgroundVideo };
