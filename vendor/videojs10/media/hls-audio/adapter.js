import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { HlsAudioAdapter } from "@videojs/spf/adapters/hls-audio";
//#region src/media/hls-audio/adapter.ts
var HlsAudio = class extends MediaAttachMixin(CustomMediaElement("audio", HlsAudioAdapter)) {};
//#endregion
export { HlsAudio };
