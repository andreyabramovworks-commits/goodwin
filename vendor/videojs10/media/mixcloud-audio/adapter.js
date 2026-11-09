import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { escapeHtml } from "@videojs/utils/string";
import { MixcloudAdapter, buildMixcloudIframeSrc } from "@videojs/mixcloud-audio";
//#region src/media/mixcloud-audio/adapter.ts
var MixcloudCustomMediaElement = class extends CustomMediaElement("iframe", MixcloudAdapter) {
	static {
		this.getTemplateHTML = (attrs) => {
			const initialSrc = buildMixcloudIframeSrc(attrs.src ?? "");
			return `<style> :host { display: block; position: relative; height: 120px; } iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; } /* * The widget is Mixcloud's own chrome, so without controls it is a * transport and nothing else. Hidden rather than merely inert, and * important so a consumer's own display rule cannot put it back on * screen. An iframe in a hidden subtree still loads and plays its src. */ :host(:not([controls])) { display: none !important; } </style><iframe part="iframe" title="Mixcloud audio player" ${initialSrc ? ` src="${escapeHtml(initialSrc)}"` : ""} allow="autoplay; encrypted-media" frameborder="0" width="100%" height="100%" referrerpolicy="${escapeHtml(attrs.referrerpolicy ?? "")}" ></iframe>`;
		};
	}
};
var MixcloudAudio = class extends MediaAttachMixin(MixcloudCustomMediaElement) {};
//#endregion
export { MixcloudAudio };
