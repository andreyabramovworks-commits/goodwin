import { safeDefine } from "../../registration/safe-define.js";
import { YouTubeVideo } from "../../media/youtube-video/adapter.js";
//#region src/define/media/youtube-video.ts
var YouTubeVideoElement = class extends YouTubeVideo {
	static {
		this.tagName = "youtube-video";
	}
};
safeDefine(YouTubeVideoElement);
//#endregion
export { YouTubeVideoElement };
