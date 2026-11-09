import { PlayerExtensionElement } from "../player-extension-element.js";
import { GoogleCastExtension } from "@videojs/google-cast";
//#region src/extensions/google-cast/extension.ts
/**
* Adds the Google Cast extension to the surrounding player.
*
* Renders nothing — place it inside the player and it follows whatever media the player attaches, a plain `<video>`
* included.
*
* @example
*   ```html
*   <video-player>
*   <video src="https://example.com/video.mp4"></video>
*   <google-cast receiver="YOUR_APP_ID"></google-cast>
*   </video-player>
*   ```;
*/
var GoogleCastExtension$1 = class extends PlayerExtensionElement {
	static {
		this.tagName = "google-cast";
	}
	static {
		this.properties = {
			src: { type: String },
			contentType: {
				type: String,
				attribute: "content-type"
			},
			streamType: {
				type: String,
				attribute: "stream-type"
			},
			receiver: { type: String }
		};
	}
	createExtension() {
		return new GoogleCastExtension();
	}
	/** Source URL loaded on the Cast receiver. Falls back to the source the media is playing. */
	get src() {
		return this.extension.src ?? "";
	}
	set src(value) {
		this.extension.src = value ?? void 0;
	}
	/** MIME type of the Cast source. When unset, the receiver infers it from the URL. */
	get contentType() {
		return this.extension.contentType;
	}
	set contentType(value) {
		this.extension.contentType = value ?? void 0;
	}
	/** Stream type used on the Cast receiver. Falls back to the media's `streamType`. */
	get streamType() {
		return this.extension.streamType;
	}
	set streamType(value) {
		this.extension.streamType = value ?? void 0;
	}
	/** Cast receiver application ID. Defaults to Google's default media receiver. */
	get receiver() {
		return this.extension.receiver;
	}
	set receiver(value) {
		this.extension.receiver = value ?? void 0;
	}
	/** Custom data sent to the Cast receiver with the load request. */
	get customData() {
		return this.extension.customData;
	}
	set customData(value) {
		this.extension.customData = value;
	}
};
//#endregion
export { GoogleCastExtension$1 as GoogleCastExtension };
