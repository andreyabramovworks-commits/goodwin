import { createPlayer } from "../../player/create-player.js";
import { audioFeatures } from "@videojs/core/dom";
//#region src/presets/audio/player.ts
const { PlayerElement, PlayerController: AudioPlayerController } = createPlayer({ features: audioFeatures });
/** Player controller bound to the standard audio player store. */
const PlayerController = AudioPlayerController;
var AudioPlayerElement = class extends PlayerElement {
	static {
		this.tagName = "audio-player";
	}
};
//#endregion
export { AudioPlayerElement, PlayerController };
