import { registerIcons } from "../../../icons/element/register/index.js";
import { pauseIcon } from "../../../icons/dist/html/neutral/pause.js";
import { playIcon } from "../../../icons/dist/html/neutral/play.js";
import { restartIcon } from "../../../icons/dist/html/neutral/restart.js";
import { spinnerIcon } from "../../../icons/dist/html/neutral/spinner.js";
import { volumeHighIcon } from "../../../icons/dist/html/neutral/volume-high.js";
import { volumeLowIcon } from "../../../icons/dist/html/neutral/volume-low.js";
import { volumeOffIcon } from "../../../icons/dist/html/neutral/volume-off.js";
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
import "../../../define/ui/play-button.js";
import "../../../define/ui/slider-track.js";
import "../../../define/ui/slider-fill.js";
import "../../../define/ui/slider-thumb.js";
import "../../../define/ui/mute-button.js";
import "../../../define/ui/volume-popover.js";
import "../../../define/ui/volume-slider.js";
import "../../../define/ui/hotkey.js";
import "../../../define/ui/status-announcer.js";
import "../../../define/ui/live-button.js";
//#region src/internal/skins/neutral-live-audio/register.ts
registerIcons("neutral", {
	pause: pauseIcon,
	play: playIcon,
	restart: restartIcon,
	spinner: spinnerIcon,
	"volume-high": volumeHighIcon,
	"volume-low": volumeLowIcon,
	"volume-off": volumeOffIcon
});
//#endregion
