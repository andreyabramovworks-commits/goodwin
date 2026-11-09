import { safeDefine } from "../../registration/safe-define.js";
import { HlsVideo } from "../../media/hls-video/adapter.js";
//#region src/define/media/hls-video.ts
/** Lightweight SPF-backed HLS media component registered as `<hls-video>`. */
var HlsVideoElement = class extends HlsVideo {
	static {
		this.tagName = "hls-video";
	}
};
safeDefine(HlsVideoElement);
//#endregion
export { HlsVideoElement };
