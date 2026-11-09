import { checkIcon } from "../../../icons/dist/html/default/check.js";
import { pauseIcon } from "../../../icons/dist/html/default/pause.js";
import { playIcon } from "../../../icons/dist/html/default/play.js";
import { restartIcon } from "../../../icons/dist/html/default/restart.js";
import { seekIcon } from "../../../icons/dist/html/default/seek.js";
import { spinnerIcon } from "../../../icons/dist/html/default/spinner.js";
import { volumeHighIcon } from "../../../icons/dist/html/default/volume-high.js";
import { volumeLowIcon } from "../../../icons/dist/html/default/volume-low.js";
import { volumeOffIcon } from "../../../icons/dist/html/default/volume-off.js";
import { registerIcons } from "../../../icons/element/register/index.js";
import "../../../define/ui/container.js";
import "../../../define/ui/buffering-indicator.js";
import "../../../define/ui/error-dialog.js";
import "../../../define/ui/dialog-backdrop.js";
import "../../../define/ui/dialog-popup.js";
import "../../../define/ui/dialog-title.js";
import "../../../define/ui/dialog-description.js";
import "../../../define/ui/dialog-close.js";
import "../../../define/ui/controls.js";
import "../../../define/ui/controls-content.js";
import "../../../define/ui/tooltip-group.js";
import "../../../define/ui/controls-group.js";
import "../../../define/ui/tooltip.js";
import "../../../define/ui/tooltip-label.js";
import "../../../define/ui/tooltip-shortcut.js";
import "../../../define/ui/seek-button.js";
import "../../../define/ui/play-button.js";
import "../../../define/ui/time-slider.js";
import "../../../define/ui/slider-track.js";
import "../../../define/ui/slider-buffer.js";
import "../../../define/ui/slider-fill.js";
import "../../../define/ui/slider-thumb.js";
import "../../../define/ui/slider-preview.js";
import "../../../define/ui/slider-value.js";
import "../../../define/ui/mute-button.js";
import "../../../define/ui/volume-popover.js";
import "../../../define/ui/volume-slider.js";
import "../../../define/ui/time.js";
import "../../../define/ui/menu.js";
import "../../../define/ui/menu-content.js";
import "../../../define/ui/menu-radio-item.js";
import "../../../define/ui/menu-item-indicator.js";
import "../../../define/ui/playback-rate-radio-group.js";
import "../../../define/ui/hotkey.js";
import "../../../define/ui/status-announcer.js";
import "../../../define/ui/playback-rate-button.js";
//#region src/internal/skins/default-audio/register.ts
registerIcons("default", {
	check: checkIcon,
	pause: pauseIcon,
	play: playIcon,
	restart: restartIcon,
	seek: seekIcon,
	spinner: spinnerIcon,
	"volume-high": volumeHighIcon,
	"volume-low": volumeLowIcon,
	"volume-off": volumeOffIcon
});
//#endregion
