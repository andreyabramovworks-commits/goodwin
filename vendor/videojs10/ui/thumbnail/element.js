import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { UIElement } from "../ui-element.js";
import { ThumbnailCore, ThumbnailDataAttrs, mapCuesToThumbnails } from "@videojs/core";
import { applyElementProps, applyStateDataAttrs, createThumbnail, selectTextTrack } from "@videojs/core/dom";
import { findComposedElement, isHTMLImageElement, listen } from "@videojs/utils/dom";
//#region src/ui/thumbnail/element.ts
const SHADOW_CSS = `\
:host {
  display: inline-block;
  overflow: hidden;
}
img,
::slotted(img) {
  display: block;
}`;
/**
* Image attributes the element fills in from its own properties. Ones already on an image when it is adopted are the
* author's and are left alone, so an `<img slot="thumbnail" loading="lazy">` keeps its settings inside a skin.
*/
const IMAGE_ATTRIBUTES = [
	"crossorigin",
	"loading",
	"fetchpriority"
];
/** The image the element draws when none is supplied, reachable from outside as `::part(image)`. */
function createFallbackImage() {
	const img = document.createElement("img");
	img.alt = "";
	img.setAttribute("part", "image");
	img.setAttribute("aria-hidden", "true");
	img.setAttribute("decoding", "async");
	return img;
}
/**
* `<media-thumbnail>` — resolves and sizes a time-based thumbnail into an image.
*
* The element owns `src` and `srcset` on the active image. Left empty, it draws an image of its own in its shadow root.
* Supply an `<img>` child instead — `<media-thumbnail time="12"><img alt=""></media-thumbnail>` — to compose overlays
* or loading indicators beside the image the element controls. Any `crossorigin`, `loading`, or `fetchpriority` the
* child already carries wins over the element's own; the rest are filled in. Inside a skin, an `<img slot="thumbnail">`
* of yours replaces the one the skin carries.
*/
var ThumbnailElement = class extends UIElement {
	static {
		this.tagName = "media-thumbnail";
	}
	static {
		this.properties = {
			time: { type: Number },
			crossOrigin: {
				type: String,
				attribute: "crossorigin"
			},
			loading: { type: String },
			fetchPriority: {
				type: String,
				attribute: "fetchpriority"
			}
		};
	}
	#core;
	#shadow;
	#fallback;
	#children;
	#imageAttributes;
	#textTracks;
	#slots;
	#img;
	/** Attributes `#img` already carried when adopted, which the author owns. */
	#authored;
	#thumbnails;
	#externalThumbnails;
	#lastTextTrack;
	#api;
	constructor() {
		super();
		this.time = 0;
		this.#core = new ThumbnailCore();
		this.#shadow = this.attachShadow({ mode: "open" });
		this.#fallback = createFallbackImage();
		this.#children = new MutationObserver(() => this.requestUpdate());
		this.#imageAttributes = new MutationObserver(() => this.requestUpdate());
		this.#textTracks = new PlayerController(this, playerContext, selectTextTrack);
		this.#slots = null;
		this.#img = null;
		this.#authored = /* @__PURE__ */ new Set();
		this.#thumbnails = [];
		this.#api = null;
		const style = document.createElement("style");
		style.textContent = SHADOW_CSS;
		this.#shadow.append(style, document.createElement("slot"), this.#fallback);
	}
	/**
	* Set thumbnail images directly, bypassing the automatic `<track>` detection. When set, this takes priority over the
	* text track path.
	*/
	get thumbnails() {
		return this.#externalThumbnails;
	}
	set thumbnails(value) {
		this.#externalThumbnails = value;
		this.requestUpdate();
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
		this.#api = createThumbnail({
			getContainer: () => this,
			getImg: () => this.#img,
			onStateChange: () => this.requestUpdate()
		});
		this.#children.observe(this, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["src", "srcset"]
		});
		this.#slots = new AbortController();
		listen(this, "slotchange", () => this.requestUpdate(), { signal: this.#slots.signal });
		this.requestUpdate();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.#adopt(null);
		this.#children.disconnect();
		this.#slots?.abort();
		this.#slots = null;
		this.#api?.destroy();
		this.#api = null;
	}
	destroyCallback() {
		this.#api?.destroy();
		super.destroyCallback();
	}
	update(changed) {
		super.update(changed);
		const textTrack = this.#textTracks.value;
		if (this.#externalThumbnails) this.#thumbnails = this.#externalThumbnails;
		else if (textTrack !== this.#lastTextTrack) {
			this.#lastTextTrack = textTrack;
			const thumbnailsTrack = textTrack?.thumbnailsTrack;
			this.#thumbnails = thumbnailsTrack && thumbnailsTrack.cues.length > 0 ? mapCuesToThumbnails(thumbnailsTrack.cues, thumbnailsTrack.src ?? void 0) : [];
		}
		const thumbnail = this.#core.findActiveThumbnail(this.#thumbnails, this.time);
		const img = findComposedElement(this, isHTMLImageElement) ?? this.#fallback;
		this.#adopt(img);
		this.#applyImageAttributes(img, textTrack);
		this.#api?.updateSrc(thumbnail?.url);
		this.#applySource(thumbnail?.url);
		this.#api?.connect();
		if (!thumbnail) {
			this.#resetStyles();
			const state = this.#core.getState(false, false, void 0);
			applyElementProps(this, this.#core.getAttrs(state));
			applyStateDataAttrs(this, state, ThumbnailDataAttrs);
			return;
		}
		const api = this.#api;
		const state = this.#core.getState(api?.loading ?? false, api?.error ?? false, thumbnail);
		applyElementProps(this, this.#core.getAttrs(state));
		applyStateDataAttrs(this, state, ThumbnailDataAttrs);
		if (api?.naturalWidth && api.naturalHeight) {
			const constraints = api.readConstraints();
			const result = this.#core.resize(thumbnail, api.naturalWidth, api.naturalHeight, constraints);
			if (result) this.#applyResize(result);
		}
	}
	/**
	* Leaving `crossOrigin` unset means "follow the media component", so thumbnails keep working on a CORS-enabled player
	* without a skin having to thread an attribute through. Only the `<track>` path inherits: `thumbnails` set directly
	* may point at a host that has nothing to do with the media component.
	*/
	#inheritedCrossOrigin(textTrack) {
		return this.#externalThumbnails ? void 0 : textTrack?.thumbnailsTrack?.crossOrigin;
	}
	/** Sync image attributes from element properties, leaving the ones the author put on the image alone. */
	#applyImageAttributes(img, textTrack) {
		const props = {
			crossorigin: this.#core.resolveCrossOrigin(this.crossOrigin, this.#inheritedCrossOrigin(textTrack)),
			loading: this.loading,
			fetchpriority: this.fetchPriority
		};
		for (const name of this.#authored) delete props[name];
		applyElementProps(img, props);
	}
	#applyResize(result) {
		this.style.width = `${result.containerWidth}px`;
		this.style.height = `${result.containerHeight}px`;
		const imgStyle = this.#img?.style;
		if (!imgStyle) return;
		imgStyle.width = `${result.imageWidth}px`;
		imgStyle.height = `${result.imageHeight}px`;
		imgStyle.maxWidth = "none";
		imgStyle.transform = result.offsetX || result.offsetY ? `translate(-${result.offsetX}px, -${result.offsetY}px)` : "";
	}
	#resetStyles() {
		this.style.width = "";
		this.style.height = "";
		const imgStyle = this.#img?.style;
		if (!imgStyle) return;
		imgStyle.width = "";
		imgStyle.height = "";
		imgStyle.maxWidth = "";
		imgStyle.transform = "";
	}
	#adopt(next) {
		if (next === this.#img) return;
		const previous = this.#img;
		if (previous) {
			this.#api?.disconnectImg(previous);
			this.#resetStyles();
			previous.removeAttribute("src");
			previous.removeAttribute("srcset");
			for (const name of IMAGE_ATTRIBUTES) if (!this.#authored.has(name)) previous.removeAttribute(name);
		}
		this.#img = next;
		this.#authored = new Set(next ? IMAGE_ATTRIBUTES.filter((name) => next.hasAttribute(name)) : []);
		this.#imageAttributes.disconnect();
		if (next && next !== this.#fallback) this.#imageAttributes.observe(next, {
			attributes: true,
			attributeFilter: ["src", "srcset"]
		});
		if (next === this.#fallback) this.#shadow.append(this.#fallback);
		else if (next) this.#fallback.remove();
		this.#api?.updateSrc(void 0);
	}
	#applySource(src) {
		const img = this.#img;
		if (!img) return;
		img.removeAttribute("srcset");
		if (!src) img.removeAttribute("src");
		else if (img.getAttribute("src") !== src) img.setAttribute("src", src);
	}
};
//#endregion
export { ThumbnailElement };
