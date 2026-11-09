import { safeDefine } from "../../../registration/safe-define.js";
import { MuxAudio } from "../../../media/mux-audio/spf.js";
//#region src/define/media/mux-audio/spf.ts
var MuxAudioElement = class extends MuxAudio {
	static {
		this.tagName = "mux-audio";
	}
};
safeDefine(MuxAudioElement);
//#endregion
export { MuxAudioElement };
