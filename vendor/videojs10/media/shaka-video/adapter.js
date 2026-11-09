import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { ShakaAdapter } from "@videojs/shaka-video";
//#region src/media/shaka-video/adapter.ts
var ShakaVideo = class extends MediaAttachMixin(CustomMediaElement("video", ShakaAdapter)) {};
//#endregion
export { ShakaVideo };
