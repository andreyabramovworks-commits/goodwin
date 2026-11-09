import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { escapeHtml } from "@videojs/utils/string";
import { SoundCloudAdapter, buildSoundCloudIframeSrc } from "@videojs/soundcloud-audio";
//#region src/media/soundcloud-audio/adapter.ts
var SoundCloudCustomMediaElement = class extends CustomMediaElement("iframe", SoundCloudAdapter) {
	static {
		this.getTemplateHTML = (attrs) => {
			const initialSrc = buildSoundCloudIframeSrc(attrs.src ?? "");
			return `<style> :host { display: block; position: relative; height: 166px; } iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; } /* * The widget is SoundCloud's own chrome, so without controls it is a * transport and nothing else. Hidden rather than merely inert, and * important so a consumer's own display rule cannot put it back on * screen. An iframe in a hidden subtree still loads and plays its src. */ :host(:not([controls])) { display: none !important; } </style><iframe part="iframe" title="SoundCloud audio player" ${initialSrc ? ` src="${escapeHtml(initialSrc)}"` : ""} allow="autoplay; encrypted-media" scrolling="no" frameborder="0" width="100%" height="100%" referrerpolicy="${escapeHtml(attrs.referrerpolicy ?? "")}" ></iframe>`;
		};
	}
};
var SoundCloudAudio = class extends MediaAttachMixin(SoundCloudCustomMediaElement) {};
//#endregion
export { SoundCloudAudio };
