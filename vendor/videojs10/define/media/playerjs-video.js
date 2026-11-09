import { safeDefine } from "../../registration/safe-define.js";
import { PlayerJsVideo } from "../../media/playerjs-video/adapter.js";
//#region src/define/media/playerjs-video.ts
var PlayerJsVideoElement = class extends PlayerJsVideo {
	static {
		this.tagName = "playerjs-video";
	}
};
safeDefine(PlayerJsVideoElement);
//#endregion
export { PlayerJsVideoElement };
