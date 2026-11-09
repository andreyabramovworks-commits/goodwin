import { createPlayer } from "../../player/create-player.js";
import { videoFeatures } from "@videojs/core/dom";
//#region src/presets/video/player.ts
const { PlayerElement, PlayerController: VideoPlayerController } = createPlayer({ features: videoFeatures });
/** Player controller bound to the standard video player store. */
const PlayerController = VideoPlayerController;
/**
* Player-state provider registered as `<video-player>`.
*
* The element owns the configured video store but no layout. Put a skin or `<media-container>` inside it to provide the
* media, controls, and fullscreen target.
*/
var VideoPlayerElement = class extends PlayerElement {
	static {
		this.tagName = "video-player";
	}
};
//#endregion
export { PlayerController, VideoPlayerElement };
