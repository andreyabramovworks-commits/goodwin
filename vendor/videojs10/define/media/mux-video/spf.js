import { safeDefine } from "../../../registration/safe-define.js";
import { MuxVideo } from "../../../media/mux-video/spf.js";
//#region src/define/media/mux-video/spf.ts
var MuxVideoElement = class extends MuxVideo {
	static {
		this.tagName = "mux-video";
	}
};
safeDefine(MuxVideoElement);
//#endregion
export { MuxVideoElement };
