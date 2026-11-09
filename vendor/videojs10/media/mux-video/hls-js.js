import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { MuxVideoMixin } from "./mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { MuxVideoAdapter } from "@videojs/mux-video";
//#region src/media/mux-video/hls-js.ts
const MuxVideoBase = MuxVideoMixin(MediaAttachMixin(CustomMediaElement("video", MuxVideoAdapter)));
var MuxVideo = class extends MuxVideoBase {};
//#endregion
export { MuxVideo };
