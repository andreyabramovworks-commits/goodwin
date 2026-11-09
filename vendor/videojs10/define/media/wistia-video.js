import { safeDefine } from "../../registration/safe-define.js";
import { WistiaVideo } from "../../media/wistia-video/adapter.js";
//#region src/define/media/wistia-video.ts
var WistiaVideoElement = class extends WistiaVideo {
	static {
		this.tagName = "wistia-video";
	}
};
safeDefine(WistiaVideoElement);
//#endregion
export { WistiaVideoElement };
