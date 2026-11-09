import { safeDefine } from "../../registration/safe-define.js";
import { BackgroundVideo } from "../../media/background-video/adapter.js";
//#region src/define/media/background-video.ts
var BackgroundVideoElement = class extends BackgroundVideo {
	static {
		this.tagName = "background-video";
	}
};
safeDefine(BackgroundVideoElement);
//#endregion
export { BackgroundVideoElement };
