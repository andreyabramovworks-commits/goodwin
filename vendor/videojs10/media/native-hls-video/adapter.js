import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { NativeHlsAdapter } from "@videojs/native-hls-video";
//#region src/media/native-hls-video/adapter.ts
var NativeHlsVideo = class extends MediaAttachMixin(CustomMediaElement("video", NativeHlsAdapter)) {};
//#endregion
export { NativeHlsVideo };
