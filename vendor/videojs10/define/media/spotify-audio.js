import { safeDefine } from "../../registration/safe-define.js";
import { SpotifyAudio } from "../../media/spotify-audio/adapter.js";
//#region src/define/media/spotify-audio.ts
var SpotifyAudioElement = class extends SpotifyAudio {
	static {
		this.tagName = "spotify-audio";
	}
};
safeDefine(SpotifyAudioElement);
//#endregion
export { SpotifyAudioElement };
