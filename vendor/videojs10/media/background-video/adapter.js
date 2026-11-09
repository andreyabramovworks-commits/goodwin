import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { getTemplateHTML } from "./template.js";
import { namedNodeMapToObject } from "@videojs/utils/dom";
//#region src/media/background-video/adapter.ts
const HTMLElementBase = globalThis.HTMLElement ?? class {};
var BackgroundVideo = class extends MediaAttachMixin(HTMLElementBase) {
	static {
		this.shadowRootOptions = { mode: "open" };
	}
	static {
		this.getTemplateHTML = getTemplateHTML;
	}
	static get observedAttributes() {
		return ["src"];
	}
	constructor() {
		super();
		if (!this.shadowRoot) {
			this.attachShadow(this.constructor.shadowRootOptions);
			const attrs = {
				...namedNodeMapToObject(this.attributes),
				...!this.hasAttribute("nomuted") && { muted: "" },
				...!this.hasAttribute("noloop") && { loop: "" },
				...!this.hasAttribute("noautoplay") && { autoplay: "" },
				playsinline: "",
				disableremoteplayback: "",
				disablepictureinpicture: ""
			};
			this.shadowRoot.innerHTML = getTemplateHTML(attrs);
		}
		this.target.muted = !this.hasAttribute("nomuted");
	}
	getMediaTarget() {
		return this.target;
	}
	attributeChangedCallback(attrName, oldValue, newValue) {
		if (attrName === "src" && oldValue !== newValue) this.target.src = newValue ?? "";
	}
	get target() {
		const slotted = this.querySelector(":scope > [slot=media]");
		if (slotted instanceof HTMLVideoElement) return slotted;
		const video = this.querySelector("video") ?? this.shadowRoot?.querySelector("video");
		return video instanceof HTMLVideoElement ? video : null;
	}
};
//#endregion
export { BackgroundVideo };
