import { I18nProviderElement } from "../../i18n/provider-element.js";
import { safeDefine } from "../../registration/safe-define.js";
import { MediaTextElement as TextElement } from "../../ui/text/element.js";
import { BufferingIndicatorElement } from "../../ui/buffering-indicator/element.js";
import { ContainerElement } from "../../ui/container/element.js";
import { GestureElement } from "../../ui/gesture/element.js";
import { HotkeyElement } from "../../ui/hotkey/element.js";
import { LiveButtonElement } from "../../ui/live-button/element.js";
import { MuteButtonElement } from "../../ui/mute-button/element.js";
import { PlayButtonElement } from "../../ui/play-button/element.js";
import { PopoverElement } from "../../ui/popover/element.js";
import { defineErrorDialog, defineTime, defineTimeSlider, defineTooltip, defineVolumeSlider } from "../../registration/ui-compounds.js";
//#region src/define/live-audio/ui.ts
safeDefine(ContainerElement);
safeDefine(I18nProviderElement);
defineErrorDialog();
defineTimeSlider();
defineVolumeSlider();
defineTime();
defineTooltip();
safeDefine(GestureElement);
safeDefine(HotkeyElement);
safeDefine(BufferingIndicatorElement);
safeDefine(LiveButtonElement);
safeDefine(MuteButtonElement);
safeDefine(PlayButtonElement);
safeDefine(PopoverElement);
safeDefine(TextElement);
//#endregion
