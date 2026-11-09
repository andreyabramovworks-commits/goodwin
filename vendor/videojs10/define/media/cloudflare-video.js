import { safeDefine } from "../../registration/safe-define.js";
import { CloudflareVideo } from "../../media/cloudflare-video/adapter.js";
//#region src/define/media/cloudflare-video.ts
var CloudflareVideoElement = class extends CloudflareVideo {
	static {
		this.tagName = "cloudflare-video";
	}
};
safeDefine(CloudflareVideoElement);
//#endregion
export { CloudflareVideoElement };
