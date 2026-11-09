import { safeDefine } from "../../registration/safe-define.js";
import { BufferingIndicatorElement } from "../../ui/buffering-indicator/element.js";
import { ContainerElement } from "../../ui/container/element.js";
import { HotkeyElement } from "../../ui/hotkey/element.js";
import { MuteButtonElement } from "../../ui/mute-button/element.js";
import { PlayButtonElement } from "../../ui/play-button/element.js";
import { PlaybackRateButtonElement } from "../../ui/playback-rate-button/element.js";
import { PlaybackRateRadioGroupElement } from "../../ui/playback-rate-radio-group/element.js";
import { PopoverElement } from "../../ui/popover/element.js";
import { SeekButtonElement } from "../../ui/seek-button/element.js";
import { defineErrorDialog, defineMenu, defineTime, defineTimeSlider, defineTooltip, defineVolumeSlider } from "../../registration/ui-compounds.js";
//#region src/define/audio/neutral-ui.ts
safeDefine(ContainerElement);
defineErrorDialog();
defineTimeSlider();
defineVolumeSlider();
defineTime();
defineMenu();
defineTooltip();
safeDefine(BufferingIndicatorElement);
safeDefine(HotkeyElement);
safeDefine(MuteButtonElement);
safeDefine(PlayButtonElement);
safeDefine(PlaybackRateButtonElement);
safeDefine(PlaybackRateRadioGroupElement);
safeDefine(PopoverElement);
safeDefine(SeekButtonElement);
//#endregion
