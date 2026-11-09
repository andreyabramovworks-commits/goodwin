import { safeDefine } from "../../registration/safe-define.js";
import { ShakaVideo } from "../../media/shaka-video/adapter.js";
//#region src/define/media/shaka-video.ts
/** @experimental */
var ShakaVideoElement = class extends ShakaVideo {
	static {
		this.tagName = "shaka-video";
	}
};
safeDefine(ShakaVideoElement);
//#endregion
export { ShakaVideoElement };
