import { createPlayer } from "../../player/create-player.js";
import { liveAudioFeatures } from "@videojs/core/dom";
//#region src/presets/live-audio/player.ts
const { PlayerElement, PlayerController: LiveAudioPlayerController } = createPlayer({ features: liveAudioFeatures });
/** Player controller bound to the live audio player store. */
const PlayerController = LiveAudioPlayerController;
var LiveAudioPlayerElement = class extends PlayerElement {
	static {
		this.tagName = "live-audio-player";
	}
};
//#endregion
export { LiveAudioPlayerElement, PlayerController };
