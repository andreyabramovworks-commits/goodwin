import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MediaButtonElement } from "../media-button-element.js";
import { toggleCommandTarget } from "../command-for.js";
import { CaptionsButtonCore, CaptionsButtonDataAttrs } from "@videojs/core";
import { applyElementProps, selectTextTrack } from "@videojs/core/dom";
import { isCaptionOrSubtitleTrack } from "@videojs/utils/dom";
//#region src/ui/captions-button/element.ts
function getCaptionTrackCount(state) {
	return state.textTrackList.filter(isCaptionOrSubtitleTrack).length;
}
var CaptionsButtonElement = class extends MediaButtonElement {
	constructor(..._args) {
		super(..._args);
		this.commandfor = void 0;
		this.menuFor = void 0;
		this.#defaultCommandfor = void 0;
		this.core = new CaptionsButtonCore();
		this.stateAttrMap = CaptionsButtonDataAttrs;
		this.mediaState = new PlayerController(this, playerContext, selectTextTrack);
		this.hotkeyAction = "toggleSubtitles";
	}
	static {
		this.tagName = "media-captions-button";
	}
	static {
		this.properties = {
			label: { type: String },
			disabled: { type: Boolean },
			commandfor: { type: String },
			menuFor: {
				type: String,
				attribute: "menu-for"
			}
		};
	}
	#defaultCommandfor;
	connectedCallback() {
		super.connectedCallback();
		if (this.commandfor && this.commandfor !== this.menuFor) this.#defaultCommandfor = this.commandfor;
	}
	activate(state, event) {
		if (this.menuFor && getCaptionTrackCount(state) > 1) {
			if (event instanceof KeyboardEvent) toggleCommandTarget(this, this.menuFor);
			return;
		}
		this.core.toggle(state);
	}
	getIsButtonDisabled() {
		const media = this.mediaState.value;
		if (super.getIsButtonDisabled()) return true;
		if (media && getCaptionTrackCount(media) === 0) return true;
		return false;
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		if (changed.has("commandfor") && this.commandfor !== this.menuFor) this.#defaultCommandfor = this.commandfor;
		if (changed.has("commandfor") || changed.has("menuFor")) this.#syncCommandFor();
	}
	update(changed) {
		super.update(changed);
		const media = this.mediaState.value;
		if (!media) return;
		this.#syncCommandFor(media);
		if (this.menuFor && getCaptionTrackCount(media) > 1) applyElementProps(this, { "aria-disabled": this.getIsButtonDisabled() ? "true" : void 0 });
	}
	#syncCommandFor(media) {
		const state = media ?? this.mediaState.value;
		const target = state && this.menuFor && getCaptionTrackCount(state) > 1 ? this.menuFor : this.#defaultCommandfor;
		if (target) this.setAttribute("commandfor", target);
		else this.removeAttribute("commandfor");
	}
};
//#endregion
export { CaptionsButtonElement };
