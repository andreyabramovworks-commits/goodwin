import { safeDefine } from "../../../registration/safe-define.js";
import { MuxAudio } from "../../../media/mux-audio/hls-js.js";
//#region src/define/media/mux-audio/hls-js.ts
var MuxAudioElement = class extends MuxAudio {
	static {
		this.tagName = "mux-audio";
	}
};
safeDefine(MuxAudioElement);
//#endregion
export { MuxAudioElement };
