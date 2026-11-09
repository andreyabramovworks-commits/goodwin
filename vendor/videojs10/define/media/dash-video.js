import { safeDefine } from "../../registration/safe-define.js";
import { DashVideo } from "../../media/dash-video/adapter.js";
//#region src/define/media/dash-video.ts
/**
* MPEG-DASH media component powered by dash.js and registered as `<dash-video>`.
*
* @experimental
*/
var DashVideoElement = class extends DashVideo {
	static {
		this.tagName = "dash-video";
	}
};
safeDefine(DashVideoElement);
//#endregion
export { DashVideoElement };
