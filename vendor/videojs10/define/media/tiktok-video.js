import { safeDefine } from "../../registration/safe-define.js";
import { TikTokVideo } from "../../media/tiktok-video/adapter.js";
//#region src/define/media/tiktok-video.ts
var TikTokVideoElement = class extends TikTokVideo {
	static {
		this.tagName = "tiktok-video";
	}
};
safeDefine(TikTokVideoElement);
//#endregion
export { TikTokVideoElement };
