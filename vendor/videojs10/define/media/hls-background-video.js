import { safeDefine } from "../../registration/safe-define.js";
import { HlsBackgroundVideo } from "../../media/hls-background-video/adapter.js";
//#region src/define/media/hls-background-video.ts
var HlsBackgroundVideoElement = class extends HlsBackgroundVideo {
	static {
		this.tagName = "hls-background-video";
	}
};
safeDefine(HlsBackgroundVideoElement);
//#endregion
export { HlsBackgroundVideoElement };
