import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { escapeHtml } from "@videojs/utils/string";
import { TikTokAdapter, buildTikTokIframeSrc } from "@videojs/tiktok-video";
//#region src/media/tiktok-video/adapter.ts
var TikTokCustomMediaElement = class extends CustomMediaElement("iframe", TikTokAdapter) {
	static {
		this.getTemplateHTML = (attrs) => {
			const initialSrc = buildTikTokIframeSrc(attrs.src ?? "", templateAttrsToEmbedProps(attrs));
			return `<style> :host { display: inline-block; /* TikTok videos are portrait, and the player refuses to draw its chrome below 325x578, so that is where this host starts rather than the 300x150 the landscape embeds use. */ min-width: 325px; min-height: 578px; position: relative; } iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; } /* A cross-origin frame swallows every pointer event, so the skin above it never sees the hover that reveals the controls. Kept out of hit-testing except where the host leaves TikTok's player dormant, which is the same pair of cases shouldBootstrapTikTokEmbed opts out of: then the frame's own controls are the only thing that can still start it. */ :host(:not([controls]):not([preload="none"])) { pointer-events: none; } </style><iframe part="iframe" title="TikTok video player" ${initialSrc ? ` src="${escapeHtml(initialSrc)}"` : ""} allow="accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0" width="100%" height="100%" referrerpolicy="${escapeHtml(attrs.referrerpolicy ?? "")}" ></iframe>`;
		};
	}
};
function templateAttrsToEmbedProps(attrs) {
	return {
		autoplay: attrs.autoplay !== void 0,
		defaultMuted: attrs.muted !== void 0,
		loop: attrs.loop !== void 0,
		controls: attrs.controls !== void 0,
		preload: attrs.preload
	};
}
var TikTokVideo = class extends MediaAttachMixin(TikTokCustomMediaElement) {};
//#endregion
export { TikTokVideo };
