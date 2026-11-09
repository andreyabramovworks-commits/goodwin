import { safeDefine } from "../../registration/safe-define.js";
import { NativeHlsVideo } from "../../media/native-hls-video/adapter.js";
//#region src/define/media/native-hls-video.ts
/** Browser-native HLS media component registered as `<native-hls-video>`. */
var NativeHlsVideoElement = class extends NativeHlsVideo {
	static {
		this.tagName = "native-hls-video";
	}
};
safeDefine(NativeHlsVideoElement);
//#endregion
export { NativeHlsVideoElement };
