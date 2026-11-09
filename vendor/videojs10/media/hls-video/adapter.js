import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { HlsVideoAdapter } from "@videojs/spf/adapters/hls-video";
//#region src/media/hls-video/adapter.ts
var HlsVideo = class extends MediaAttachMixin(CustomMediaElement("video", HlsVideoAdapter)) {};
//#endregion
export { HlsVideo };
