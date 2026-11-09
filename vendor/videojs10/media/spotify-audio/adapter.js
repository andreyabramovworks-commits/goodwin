import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { escapeHtml } from "@videojs/utils/string";
import { SpotifyAdapter, buildSpotifyIframeSrc } from "@videojs/spotify-audio";
//#region src/media/spotify-audio/adapter.ts
var SpotifyCustomMediaElement = class extends CustomMediaElement("iframe", SpotifyAdapter) {
	static {
		this.getTemplateHTML = (attrs) => {
			const initialSrc = buildSpotifyIframeSrc(attrs.src ?? "", templateAttrsToEmbedProps(attrs));
			return `<style> :host { display: block; min-width: 160px; min-height: 80px; position: relative; } iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; } /* * Without Spotify's own chrome the embed is a transport and nothing else: * its player UI would otherwise show through whatever skin is drawn over * it. Hidden rather than merely inert, and important so a consumer's own * display rule cannot put it back on screen. An iframe in a hidden subtree * still loads and plays its src. */ :host(:not([controls])) { display: none !important; } </style><iframe part="iframe" ${initialSrc ? ` src="${escapeHtml(initialSrc)}"` : ""} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" frameborder="0" width="100%" height="100%" referrerpolicy="${escapeHtml(attrs.referrerpolicy ?? "")}" ></iframe>`;
		};
	}
};
function templateAttrsToEmbedProps(attrs) {
	return {
		autoplay: attrs.autoplay !== void 0,
		loop: attrs.loop !== void 0,
		controls: attrs.controls !== void 0,
		playsInline: attrs.playsinline !== void 0,
		preload: attrs.preload ?? "metadata"
	};
}
var SpotifyAudio = class extends MediaAttachMixin(SpotifyCustomMediaElement) {};
//#endregion
export { SpotifyAudio };
