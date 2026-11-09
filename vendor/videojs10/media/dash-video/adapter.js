import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { DashAdapter } from "@videojs/dash-video";
//#region src/media/dash-video/adapter.ts
var DashVideo = class extends MediaAttachMixin(CustomMediaElement("video", DashAdapter)) {};
//#endregion
export { DashVideo };
