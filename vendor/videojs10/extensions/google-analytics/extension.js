import { PlayerExtensionElement } from "../player-extension-element.js";
import { GoogleAnalyticsExtension } from "@videojs/google-analytics";
//#region src/extensions/google-analytics/extension.ts
/**
* Adds the Google Analytics 4 (GA4) telemetry extension to the surrounding player.
*
* Renders nothing — place it inside the player and it monitors whichever media the player attaches, dispatching
* standard GA4 video events and interaction events (`play`, `pause`, `resume`, `end`, `seek`, `mute`, `unmute`,
* `fullscreenEnter`, `fullscreenExit`) to `window.dataLayer`.
*
* @example
*   ```html
*   <video-player>
*     <video src="https://example.com/video.mp4"></video>
*     <google-analytics></google-analytics>
*   </video-player>
*   ```;
*
* @internal
*/
var GoogleAnalyticsExtension$1 = class extends PlayerExtensionElement {
	static {
		this.tagName = "google-analytics";
	}
	static {
		this.properties = {
			dataLayerName: {
				type: String,
				attribute: "data-layer-name"
			},
			disableProgress: {
				type: Boolean,
				attribute: "disable-progress"
			},
			debug: { type: Boolean }
		};
	}
	createExtension() {
		return new GoogleAnalyticsExtension();
	}
	get dataLayerName() {
		return this.extension.dataLayerName;
	}
	set dataLayerName(value) {
		this.extension.dataLayerName = value ?? void 0;
	}
	get disableProgress() {
		return this.extension.disableProgress ?? false;
	}
	set disableProgress(value) {
		this.extension.disableProgress = value;
	}
	get debug() {
		return this.extension.debug ?? false;
	}
	set debug(value) {
		this.extension.debug = value;
	}
	/** Video metadata and custom dimensions reported with GA4 events. */
	get metadata() {
		return this.extension.metadata;
	}
	set metadata(value) {
		this.extension.metadata = value;
	}
	/** Optional callback to intercept dispatched events. */
	get onEvent() {
		return this.extension.onEvent;
	}
	set onEvent(value) {
		this.extension.onEvent = value;
	}
};
//#endregion
export { GoogleAnalyticsExtension$1 as GoogleAnalyticsExtension };
