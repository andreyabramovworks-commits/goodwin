import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { DailymotionAdapter } from "@videojs/dailymotion-video";
//#region src/media/dailymotion-video/adapter.ts
var DailymotionCustomMediaElement = class extends CustomMediaElement("iframe", DailymotionAdapter) {
	static {
		this.getTemplateHTML = () => `<style> :host { display: inline-block; min-width: 300px; min-height: 150px; position: relative; } ::slotted([slot=media]) { position: absolute; inset: 0; } </style><slot name="media"></slot>`;
	}
};
var DailymotionVideo = class extends MediaAttachMixin(DailymotionCustomMediaElement) {
	constructor() {
		super();
		this.adapter.addEventListener("volumechange", () => {
			const { muted } = this.adapter;
			if (this.hasAttribute("muted") !== muted) this.toggleAttribute("muted", muted);
		});
	}
	connectedCallback() {
		super.connectedCallback?.();
		const existing = this.querySelector(":scope > [slot=media]");
		if (existing) {
			if (this.adapter.src && !existing.hasChildNodes() && !this.adapter.error) this.adapter.load();
			return;
		}
		const container = document.createElement("div");
		container.slot = "media";
		this.append(container);
	}
};
//#endregion
export { DailymotionVideo };
