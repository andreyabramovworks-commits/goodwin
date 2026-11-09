import { safeDefine } from "../../registration/safe-define.js";
import { TwitchVideo } from "../../media/twitch-video/adapter.js";
//#region src/define/media/twitch-video.ts
var TwitchVideoElement = class extends TwitchVideo {
	static {
		this.tagName = "twitch-video";
	}
};
safeDefine(TwitchVideoElement);
//#endregion
export { TwitchVideoElement };
