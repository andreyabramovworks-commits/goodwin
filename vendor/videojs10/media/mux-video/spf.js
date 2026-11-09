import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { MuxVideoMixin } from "./mixin.js";
import { CustomMediaElement } from "@videojs/media/dom";
import { MuxVideoAdapter } from "@videojs/mux-video/spf";
//#region src/media/mux-video/spf.ts
const MuxVideoBase = MuxVideoMixin(MediaAttachMixin(CustomMediaElement("video", MuxVideoAdapter)));
/**
* `<mux-video>` over the SPF-backed Mux Media instead of the hls.js-backed one.
*
* Shares its name with the flavor in `./hls-js` on purpose: the import path picks the engine, and nothing else about
* the surface moves. Deliberately not exported from this directory's barrel, so importing one flavor never pulls the
* other's engine in with it.
*/
var MuxVideo = class extends MuxVideoBase {};
//#endregion
export { MuxVideo };
