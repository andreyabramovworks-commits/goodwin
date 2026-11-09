import { PlayerExtensionElement } from "../player-extension-element.js";
import { MuxDataExtension } from "@videojs/mux-data";
//#region src/extensions/mux-data/extension.ts
/**
* Adds the [Mux Data](https://www.mux.com/data) extension to the surrounding player.
*
* Renders nothing — place it inside the player and it follows whatever media the player attaches.
*
* Mux-hosted playback needs no `env-key`: the view reports the Mux playback ID as its `video_id`, which Mux attributes
* to the owning environment. Set `env-key` to monitor sources Mux doesn't host.
*
* Any media component works. When the media plays through an hls.js or dash.js engine, that engine is handed to the Mux
* Data SDK so the view also carries stream-level detail such as rendition switches and request timing.
*
* @example
*   ```html
*   <video-player>
*   <mux-video src="https://stream.mux.com/abc123.m3u8"></mux-video>
*   <mux-data player-software-name="mux-video"></mux-data>
*   </video-player>
*   ```;
*/
var MuxDataExtension$1 = class extends PlayerExtensionElement {
	static {
		this.tagName = "mux-data";
	}
	static {
		this.properties = {
			envKey: {
				type: String,
				attribute: "env-key"
			},
			beaconCollectionDomain: {
				type: String,
				attribute: "beacon-collection-domain"
			},
			debug: { type: Boolean },
			disableCookies: {
				type: Boolean,
				attribute: "disable-cookies"
			},
			playerSoftwareName: {
				type: String,
				attribute: "player-software-name"
			},
			playerSoftwareVersion: {
				type: String,
				attribute: "player-software-version"
			},
			playerInitTime: {
				type: Number,
				attribute: "player-init-time"
			}
		};
	}
	createExtension() {
		const extension = new MuxDataExtension();
		extension.framework = "html";
		return extension;
	}
	/** Mux Data environment key for the beacons. Optional for Mux-hosted playback. */
	get envKey() {
		return this.extension.envKey;
	}
	set envKey(value) {
		this.extension.envKey = value ?? void 0;
	}
	/** Custom domain beacons are sent to. */
	get beaconCollectionDomain() {
		return this.extension.beaconCollectionDomain;
	}
	set beaconCollectionDomain(value) {
		this.extension.beaconCollectionDomain = value ?? void 0;
	}
	/** Enables Mux Data SDK debug logging. */
	get debug() {
		return this.extension.debug;
	}
	set debug(value) {
		this.extension.debug = value;
	}
	/** Disables Mux Data SDK cookies. */
	get disableCookies() {
		return this.extension.disableCookies;
	}
	set disableCookies(value) {
		this.extension.disableCookies = value;
	}
	/**
	* Player software name reported to Mux Data (e.g. `mux-video`). Defaults to `videojs-html-<engine>`, where the engine
	* is the one playing, such as `hlsjs`, `spf-hls-video`, `shaka`, `dashjs`, or `browser`.
	*/
	get playerSoftwareName() {
		return this.extension.playerSoftwareName;
	}
	set playerSoftwareName(value) {
		this.extension.playerSoftwareName = value ?? void 0;
	}
	/** Player software version reported to Mux Data. Defaults to the Video.js version. */
	get playerSoftwareVersion() {
		return this.extension.playerSoftwareVersion;
	}
	set playerSoftwareVersion(value) {
		this.extension.playerSoftwareVersion = value ?? void 0;
	}
	/** Epoch milliseconds the player was initialized. Defaults to when the player was created. */
	get playerInitTime() {
		return this.extension.playerInitTime;
	}
	set playerInitTime(value) {
		this.extension.playerInitTime = value ?? void 0;
	}
	/** Custom view metadata forwarded to the Mux Data SDK. */
	get metadata() {
		return this.extension.metadata;
	}
	set metadata(value) {
		this.extension.metadata = value;
	}
	/** Mux Data SDK used for monitoring. Set to `undefined` to disable monitoring. */
	get MuxDataSdk() {
		return this.extension.MuxDataSdk;
	}
	set MuxDataSdk(value) {
		this.extension.MuxDataSdk = value;
	}
};
//#endregion
export { MuxDataExtension$1 as MuxDataExtension };
