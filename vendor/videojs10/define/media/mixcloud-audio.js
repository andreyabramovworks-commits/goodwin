import { safeDefine } from "../../registration/safe-define.js";
import { MixcloudAudio } from "../../media/mixcloud-audio/adapter.js";
//#region src/define/media/mixcloud-audio.ts
var MixcloudAudioElement = class extends MixcloudAudio {
	static {
		this.tagName = "mixcloud-audio";
	}
};
safeDefine(MixcloudAudioElement);
//#endregion
export { MixcloudAudioElement };
