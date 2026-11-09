import { createPlayer } from "../../player/create-player.js";
import { backgroundFeatures } from "@videojs/core/dom";
//#region src/presets/background/player.ts
const { PlayerElement, PlayerController: BackgroundVideoPlayerController } = createPlayer({ features: backgroundFeatures });
/** Player controller bound to the background video player store. */
const PlayerController = BackgroundVideoPlayerController;
var BackgroundVideoPlayerElement = class extends PlayerElement {
	static {
		this.tagName = "background-video-player";
	}
};
//#endregion
export { BackgroundVideoPlayerElement, PlayerController };
