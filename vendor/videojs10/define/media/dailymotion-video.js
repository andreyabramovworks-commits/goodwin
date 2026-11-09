import { safeDefine } from "../../registration/safe-define.js";
import { DailymotionVideo } from "../../media/dailymotion-video/adapter.js";
//#region src/define/media/dailymotion-video.ts
var DailymotionVideoElement = class extends DailymotionVideo {
	static {
		this.tagName = "dailymotion-video";
	}
};
safeDefine(DailymotionVideoElement);
//#endregion
export { DailymotionVideoElement };
