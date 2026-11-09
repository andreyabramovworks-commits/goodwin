import { createPlayer } from "../../player/create-player.js";
import { liveVideoFeatures } from "@videojs/core/dom";
//#region src/presets/live-video/player.ts
const { PlayerElement, PlayerController: LiveVideoPlayerController } = createPlayer({ features: liveVideoFeatures });
/** Player controller bound to the live video player store. */
const PlayerController = LiveVideoPlayerController;
var LiveVideoPlayerElement = class extends PlayerElement {
	static {
		this.tagName = "live-video-player";
	}
};
//#endregion
export { LiveVideoPlayerElement, PlayerController };
