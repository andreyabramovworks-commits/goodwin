import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { PopoverElement } from "../popover/element.js";
import { VolumePopoverCore, VolumePopoverDataAttrs } from "@videojs/core";
import { applyElementProps, applyStateDataAttrs, selectVolume } from "@videojs/core/dom";
//#region src/ui/volume-popover/element.ts
const unavailableVolume = {
	volume: 0,
	muted: false,
	volumeAvailability: "unsupported",
	mutedAvailability: "unsupported",
	setVolume: () => 0,
	setMuted: () => false
};
/** A volume-aware popover that keeps its adjacent mute trigger available as a fallback. */
var VolumePopoverElement = class extends PopoverElement {
	static {
		this.tagName = "media-volume-popover";
	}
	#core = new VolumePopoverCore();
	#volume = new PlayerController(this, playerContext, selectVolume);
	update(changed) {
		super.update(changed);
		this.#core.setProps(this);
		this.#core.setInput({
			active: this.hasAttribute("data-open"),
			status: this.hasAttribute("data-starting-style") ? "starting" : this.hasAttribute("data-ending-style") ? "ending" : "idle"
		});
		this.#core.setMedia(this.#volume.value ?? unavailableVolume);
		const state = this.#core.getState();
		applyStateDataAttrs(this, state, VolumePopoverDataAttrs);
		this.hidden = state.hidden;
		if (state.hidden) {
			this.close();
			if (this.triggerElement) applyElementProps(this.triggerElement, {
				"aria-expanded": void 0,
				"aria-haspopup": void 0,
				"aria-controls": void 0
			});
		}
	}
};
//#endregion
export { VolumePopoverElement };
