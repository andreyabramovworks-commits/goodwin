import { safeDefine } from "../../registration/safe-define.js";
import { HlsAudio } from "../../media/hls-audio/adapter.js";
//#region src/define/media/hls-audio.ts
var HlsAudioElement = class extends HlsAudio {
	static {
		this.tagName = "hls-audio";
	}
};
safeDefine(HlsAudioElement);
//#endregion
export { HlsAudioElement };
