import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { escapeHtml } from "@videojs/utils/string";
import { PlayerJsAdapter, buildPlayerJsIframeSrc } from "@videojs/playerjs-video";
//#region src/media/playerjs-video/adapter.ts
var PlayerJsCustomMediaElement = class extends CustomMediaElement("iframe", PlayerJsAdapter) {
	static {
		this.getTemplateHTML = (attrs) => {
			const initialSrc = buildPlayerJsIframeSrc(attrs.src ?? "", templateAttrsToEmbedProps(attrs));
			return `<style> :host { display: inline-block; min-width: 300px; min-height: 150px; position: relative; } iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; } /* A cross-origin frame swallows every pointer event, so the skin above it never sees the hover that reveals the controls. Not every service lets its chrome be hidden, so without controls the frame is kept out of hit-testing as well. */ :host(:not([controls])) { pointer-events: none; } </style><iframe part="iframe" title="Video player" ${initialSrc ? ` src="${escapeHtml(initialSrc)}"` : ""} allow="accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0" width="100%" height="100%" referrerpolicy="${escapeHtml(attrs.referrerpolicy ?? "")}" ></iframe>`;
		};
	}
};
function templateAttrsToEmbedProps(attrs) {
	return {
		autoplay: attrs.autoplay !== void 0,
		defaultMuted: attrs.muted !== void 0,
		loop: attrs.loop !== void 0,
		controls: attrs.controls !== void 0,
		preload: attrs.preload ?? PlayerJsAdapter.defaultProps.preload
	};
}
var PlayerJsVideo = class extends MediaAttachMixin(PlayerJsCustomMediaElement) {};
//#endregion
export { PlayerJsVideo };
