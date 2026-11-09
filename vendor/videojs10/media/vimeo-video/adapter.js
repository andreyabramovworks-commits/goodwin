import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { escapeHtml } from "@videojs/utils/string";
import { VimeoAdapter, buildVimeoIframeSrc } from "@videojs/vimeo-video";
//#region src/media/vimeo-video/adapter.ts
var VimeoCustomMediaElement = class extends CustomMediaElement("iframe", VimeoAdapter) {
	static {
		this.getTemplateHTML = (attrs) => {
			const initialSrc = buildVimeoIframeSrc(attrs.src ?? "", templateAttrsToEmbedProps(attrs));
			return `<style> :host { display: inline-block; min-width: 300px; min-height: 150px; position: relative; } iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; } :host(:not([controls])) { pointer-events: none; } </style><iframe part="iframe" ${initialSrc ? ` src="${escapeHtml(initialSrc)}"` : ""} allow="accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0" width="100%" height="100%" referrerpolicy="${escapeHtml(attrs.referrerpolicy ?? "")}" ></iframe>`;
		};
	}
};
function templateAttrsToEmbedProps(attrs) {
	return {
		autoplay: attrs.autoplay !== void 0,
		defaultMuted: attrs.muted !== void 0,
		loop: attrs.loop !== void 0,
		controls: attrs.controls !== void 0,
		playsInline: attrs.playsinline !== void 0,
		preload: attrs.preload ?? "metadata"
	};
}
var VimeoVideo = class extends MediaAttachMixin(VimeoCustomMediaElement) {};
//#endregion
export { VimeoVideo };
