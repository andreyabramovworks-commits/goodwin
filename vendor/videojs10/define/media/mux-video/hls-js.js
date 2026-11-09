import { safeDefine } from "../../../registration/safe-define.js";
import { MuxVideo } from "../../../media/mux-video/hls-js.js";
//#region src/define/media/mux-video/hls-js.ts
var MuxVideoElement = class extends MuxVideo {
	static {
		this.tagName = "mux-video";
	}
};
safeDefine(MuxVideoElement);
//#endregion
export { MuxVideoElement };
