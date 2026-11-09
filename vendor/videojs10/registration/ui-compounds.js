import { safeDefine } from "./safe-define.js";
import { MenuRadioItemElement } from "../ui/menu/radio-item.js";
import { MenuRadioGroupElement } from "../ui/menu/radio-group.js";
import { MenuItemIndicatorElement } from "../ui/menu/item-indicator.js";
import { ControlsBackdropElement } from "../ui/controls/backdrop.js";
import { ControlsContentElement } from "../ui/controls/content.js";
import { ControlsElement } from "../ui/controls/element.js";
import { ControlsGroupElement } from "../ui/controls/group.js";
import { DialogBackdropElement } from "../ui/dialog/backdrop.js";
import { DialogCloseElement } from "../ui/dialog/close.js";
import { DialogDescriptionElement } from "../ui/dialog/description.js";
import { DialogPopupElement } from "../ui/dialog/popup.js";
import { DialogTitleElement } from "../ui/dialog/title.js";
import { ErrorDialogElement } from "../ui/error-dialog/element.js";
import { MenuCheckboxItemElement } from "../ui/menu/checkbox-item.js";
import { MenuContentElement } from "../ui/menu/content.js";
import { MenuElement } from "../ui/menu/element.js";
import { MenuGroupElement } from "../ui/menu/group.js";
import { MenuGroupLabelElement } from "../ui/menu/group-label.js";
import { MenuItemElement } from "../ui/menu/item.js";
import { MenuSeparatorElement } from "../ui/menu/separator.js";
import { SeekIndicatorElement } from "../ui/seek-indicator/element.js";
import { SeekIndicatorValueElement } from "../ui/seek-indicator/value.js";
import { SliderBufferElement } from "../ui/slider/buffer.js";
import { SliderFillElement } from "../ui/slider/fill.js";
import { SliderPreviewElement } from "../ui/slider/preview.js";
import { SliderThumbElement } from "../ui/slider/thumb.js";
import { SliderThumbnailElement } from "../ui/slider/thumbnail.js";
import { SliderTrackElement } from "../ui/slider/track.js";
import { SliderValueElement } from "../ui/slider/value.js";
import { StatusAnnouncerElement } from "../ui/status-announcer/element.js";
import { StatusIndicatorElement } from "../ui/status-indicator/element.js";
import { StatusIndicatorValueElement } from "../ui/status-indicator/value.js";
import { TimeElement } from "../ui/time/element.js";
import { TimeGroupElement } from "../ui/time/group.js";
import { TimeSeparatorElement } from "../ui/time/separator.js";
import { TimeSliderElement } from "../ui/time-slider/element.js";
import { TooltipLabelElement } from "../ui/tooltip/label.js";
import { TooltipShortcutElement } from "../ui/tooltip/shortcut.js";
import { TooltipElement } from "../ui/tooltip/element.js";
import { TooltipGroupElement } from "../ui/tooltip/group.js";
import { VolumeIndicatorElement } from "../ui/volume-indicator/element.js";
import { VolumeIndicatorFillElement } from "../ui/volume-indicator/fill.js";
import { VolumeIndicatorValueElement } from "../ui/volume-indicator/value.js";
import { VolumeSliderElement } from "../ui/volume-slider/element.js";
//#region src/registration/ui-compounds.ts
function defineMenu() {
	safeDefine(MenuElement);
	safeDefine(MenuContentElement);
	safeDefine(MenuItemElement);
	safeDefine(MenuGroupLabelElement);
	safeDefine(MenuSeparatorElement);
	safeDefine(MenuGroupElement);
	safeDefine(MenuRadioGroupElement);
	safeDefine(MenuRadioItemElement);
	safeDefine(MenuCheckboxItemElement);
	safeDefine(MenuItemIndicatorElement);
}
function defineControls() {
	safeDefine(ControlsElement);
	safeDefine(ControlsBackdropElement);
	safeDefine(ControlsContentElement);
	safeDefine(ControlsGroupElement);
}
function defineDialogParts() {
	safeDefine(DialogBackdropElement);
	safeDefine(DialogPopupElement);
	safeDefine(DialogCloseElement);
	safeDefine(DialogDescriptionElement);
	safeDefine(DialogTitleElement);
}
function defineErrorDialog() {
	safeDefine(ErrorDialogElement);
	defineDialogParts();
}
function defineInputIndicators() {
	safeDefine(StatusAnnouncerElement);
	safeDefine(StatusIndicatorElement);
	safeDefine(StatusIndicatorValueElement);
	safeDefine(VolumeIndicatorElement);
	safeDefine(VolumeIndicatorFillElement);
	safeDefine(VolumeIndicatorValueElement);
	safeDefine(SeekIndicatorElement);
	safeDefine(SeekIndicatorValueElement);
}
/** Shared slider sub-elements used by all slider types. */
function defineSliderParts() {
	safeDefine(SliderFillElement);
	safeDefine(SliderPreviewElement);
	safeDefine(SliderThumbElement);
	safeDefine(SliderTrackElement);
	safeDefine(SliderValueElement);
}
function defineTime() {
	safeDefine(TimeElement);
	safeDefine(TimeGroupElement);
	safeDefine(TimeSeparatorElement);
}
function defineTimeSlider() {
	safeDefine(TimeSliderElement);
	defineSliderParts();
	safeDefine(SliderBufferElement);
	safeDefine(SliderThumbnailElement);
}
function defineTooltip() {
	safeDefine(TooltipGroupElement);
	safeDefine(TooltipLabelElement);
	safeDefine(TooltipShortcutElement);
	safeDefine(TooltipElement);
}
function defineVolumeSlider() {
	safeDefine(VolumeSliderElement);
	defineSliderParts();
}
function defineSliders() {
	safeDefine(TimeSliderElement);
	safeDefine(VolumeSliderElement);
	defineSliderParts();
	safeDefine(SliderBufferElement);
	safeDefine(SliderThumbnailElement);
}
//#endregion
export { defineControls, defineErrorDialog, defineInputIndicators, defineMenu, defineSliderParts, defineSliders, defineTime, defineTimeSlider, defineTooltip, defineVolumeSlider };
