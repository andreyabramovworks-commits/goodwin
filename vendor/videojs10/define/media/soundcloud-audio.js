import { safeDefine } from "../../registration/safe-define.js";
import { SoundCloudAudio } from "../../media/soundcloud-audio/adapter.js";
//#region src/define/media/soundcloud-audio.ts
var SoundCloudAudioElement = class extends SoundCloudAudio {
	static {
		this.tagName = "soundcloud-audio";
	}
};
safeDefine(SoundCloudAudioElement);
//#endregion
export { SoundCloudAudioElement };
