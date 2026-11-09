import { i18nContext } from "../../i18n/context.js";
import { I18nController } from "../../i18n/controller.js";
import { playerContext } from "../../player/context.js";
import { PlayerController } from "../../player/controller.js";
import { MenuRadioGroupElement } from "../menu/radio-group.js";
import { RadioOptionsController } from "../radio-options/controller.js";
import { QualityRadioGroupCore, QualityRadioGroupDataAttrs } from "@videojs/core";
import { applyStateDataAttrs, selectQuality } from "@videojs/core/dom";
import { translateText } from "@videojs/core/i18n";
//#region src/ui/quality-radio-group/element.ts
/**
* Menu radio group that generates an Auto `<media-menu-radio-item>` plus one per video rendition, and shares the
* selected label and availability with an enclosing menu. An optional `<template>` holding one
* `<media-menu-radio-item>` customizes each generated item; its `data-part` `label`, `tier`, and `badge` descendants
* receive the rendition's text.
*/
var QualityRadioGroupElement = class extends MenuRadioGroupElement {
	constructor(..._args) {
		super(..._args);
		this.disabled = false;
		this.label = "";
		this.formatRendition = QualityRadioGroupCore.defaultProps.formatRendition;
		this.#core = new QualityRadioGroupCore();
		this.#i18n = new I18nController(this, i18nContext);
		this.#mediaState = new PlayerController(this, playerContext, selectQuality);
		this.#options = new RadioOptionsController(this, {
			renderItem: (item, label, option) => this.#setContent(item, label, option.tier, option.badge),
			setItemAttributes: (item, option) => item.setAttribute("data-rendition", option.value),
			getOptionCacheKey: (option) => `${option.tier ?? ""}:${option.badge ?? ""}`,
			onValueChange: (value) => {
				const media = this.#mediaState.value;
				if (media) this.#core.selectValue(media, value);
			}
		});
	}
	static {
		this.tagName = "media-quality-radio-group";
	}
	static {
		this.properties = {
			...MenuRadioGroupElement.properties,
			disabled: { type: Boolean },
			label: { type: String }
		};
	}
	#core;
	#i18n;
	#mediaState;
	#options;
	connectedCallback() {
		super.connectedCallback();
		if (this.destroyed) return;
	}
	update(changed) {
		const media = this.#mediaState.value;
		let state = null;
		if (media) {
			this.#core.setProps({
				formatRendition: this.formatRendition,
				disabled: this.disabled,
				label: this.label
			});
			this.#core.setMedia(media);
			state = this.#core.getState();
			this.applyDefaultAriaLabel(translateText(this.#core.getLabel(state), this.#i18n.value));
			this.#options.sync(state, this.#i18n.value, this.#i18n.locale);
			this.publishMenuOptionState(state.disabled, state.hidden, state.availability);
		} else this.publishMenuOptionState(true, true, "unsupported");
		super.update(changed);
		if (state) applyStateDataAttrs(this, state, QualityRadioGroupDataAttrs);
	}
	#setContent(item, label, tier, badge) {
		const labelPart = item.querySelector("[data-part~=\"label\"]");
		const tierPart = item.querySelector("[data-part~=\"tier\"]");
		const badgePart = item.querySelector("[data-part~=\"badge\"]");
		if (labelPart) labelPart.textContent = label;
		if (tierPart) {
			tierPart.textContent = tier ?? "";
			tierPart.hidden = !tier;
		}
		if (badgePart) {
			badgePart.textContent = badge ?? "";
			badgePart.hidden = !badge;
		}
		if (!labelPart && !tierPart && !badgePart) item.textContent = [
			label,
			tier,
			badge
		].filter(Boolean).join(" ");
	}
};
//#endregion
export { QualityRadioGroupElement };
