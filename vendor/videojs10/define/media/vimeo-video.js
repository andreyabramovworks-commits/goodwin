import { safeDefine } from "../../registration/safe-define.js";
import { VimeoVideo } from "../../media/vimeo-video/adapter.js";
//#region src/define/media/vimeo-video.ts
var VimeoVideoElement = class extends VimeoVideo {
	static {
		this.tagName = "vimeo-video";
	}
};
safeDefine(VimeoVideoElement);
//#endregion
export { VimeoVideoElement };
