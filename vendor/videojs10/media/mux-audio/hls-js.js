import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { MuxAudioMixin } from "./mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { MuxAudioAdapter } from "@videojs/mux-audio";
//#region src/media/mux-audio/hls-js.ts
const MuxAudioBase = MuxAudioMixin(MediaAttachMixin(CustomMediaElement("audio", MuxAudioAdapter)));
var MuxAudio = class extends MuxAudioBase {};
//#endregion
export { MuxAudio };
