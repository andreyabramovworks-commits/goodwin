import { safeDefine } from "../../registration/safe-define.js";
import { HlsJsVideo } from "../../media/hlsjs-video/adapter.js";
//#region src/define/media/hlsjs-video.ts
/** Cross-browser HLS media component powered by hls.js and registered as `<hlsjs-video>`. */
var HlsJsVideoElement = class extends HlsJsVideo {
	static {
		this.tagName = "hlsjs-video";
	}
};
safeDefine(HlsJsVideoElement);
//#endregion
export { HlsJsVideoElement };
