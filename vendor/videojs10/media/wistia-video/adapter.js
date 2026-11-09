import { MediaAttachMixin } from "../../store/media-attach-mixin.js";
import { WistiaAdapter } from "@videojs/wistia-video";
//#region src/media/wistia-video/adapter.ts
/**
* `<wistia-video>` is Wistia's own `<wistia-player>`, normalized into a media by `WistiaAdapter` and attached to the
* player store here. No template and no inner player: the element written is the element that plays.
*/
var WistiaVideo = class extends MediaAttachMixin(WistiaAdapter) {};
//#endregion
export { WistiaVideo };
