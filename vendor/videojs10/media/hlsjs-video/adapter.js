import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { HlsJsAdapter } from "@videojs/hlsjs-video";
//#region src/media/hlsjs-video/adapter.ts
var HlsJsVideo = class extends MediaAttachMixin(CustomMediaElement("video", HlsJsAdapter)) {};
//#endregion
export { HlsJsVideo };
