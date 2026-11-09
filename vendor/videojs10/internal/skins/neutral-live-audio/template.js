import { createTemplate } from "@videojs/utils/dom";
//#region src/internal/skins/neutral-live-audio/template.ts
/** Static template rendered from the finalized VJSC module graph. */
const template = createTemplate(`<media-container class="media-skin media-container audio-skin" data-theme="neutral" data-preset="live-audio">
<slot>
</slot>
<media-error-dialog class="audio-dialog-root">
<media-dialog-backdrop class="audio-dialog-backdrop">
</media-dialog-backdrop>
<media-dialog-popup class="audio-dialog-popup">
<div class="audio-dialog-content">
<media-dialog-title class="audio-dialog-title">
</media-dialog-title>
<media-dialog-description class="audio-dialog-description">
</media-dialog-description>
</div>
<div class="audio-dialog-actions">
<media-dialog-close class="media-button audio-dialog-close">
</media-dialog-close>
</div>
</media-dialog-popup>
</media-error-dialog>
<media-controls visibility="always">
<media-controls-content class="audio-controls audio-controls-content">
<media-tooltip-group>
<media-controls-group class="audio-controls-start">
<div class="audio-play-button">
<media-buffering-indicator class="media-buffering-indicator audio-play-button-buffering-indicator">
<media-icon family="neutral" name="spinner" class="media-buffering-indicator-spinner-icon">
</media-icon>
</media-buffering-indicator>
<media-play-button class="media-button media-play-button" id="vjs-I2MG-wVd-0-trigger">
<media-icon family="neutral" name="restart" class="media-button-icon media-play-button-restart-icon">
</media-icon>
<media-icon family="neutral" name="play" class="media-button-icon media-play-button-play-icon">
</media-icon>
<media-icon family="neutral" name="pause" class="media-button-icon media-play-button-pause-icon">
</media-icon>
</media-play-button>
<media-tooltip trigger="vjs-I2MG-wVd-0-trigger" boundary="viewport" side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
</div>
<media-live-button class="media-button media-live-button">
</media-live-button>
</media-controls-group>
<div aria-hidden="true" class="audio-controls-spacer">
</div>
<media-controls-group class="audio-controls-end">
<media-mute-button commandfor="vjs-fH0EWHVS-0-popup" class="media-button media-mute-button" id="vjs-I2MG-wVd-0-2-trigger">
<media-icon family="neutral" name="volume-off" class="media-button-icon media-mute-button-off-icon">
</media-icon>
<media-icon family="neutral" name="volume-low" class="media-button-icon media-mute-button-low-icon">
</media-icon>
<media-icon family="neutral" name="volume-high" class="media-button-icon media-mute-button-high-icon">
</media-icon>
</media-mute-button>
<media-tooltip trigger="vjs-I2MG-wVd-0-2-trigger" delay="0" sticky side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-volume-popover open-on-hover delay="200" close-delay="100" side="left" boundary="viewport" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-volume-popover" id="vjs-fH0EWHVS-0-popup">
<media-volume-slider class="media-slider media-volume-slider" thumb-alignment="edge" orientation="horizontal">
<media-slider-track class="media-slider-track">
<media-slider-fill class="media-slider-fill">
</media-slider-fill>
</media-slider-track>
<media-slider-thumb class="media-slider-thumb media-volume-slider-thumb">
</media-slider-thumb>
</media-volume-slider>
</media-volume-popover>
</media-controls-group>
</media-tooltip-group>
</media-controls-content>
</media-controls>
<media-hotkey keys="Space" action="togglePaused">
</media-hotkey>
<media-hotkey keys="k" action="togglePaused">
</media-hotkey>
<media-hotkey keys="m" action="toggleMuted">
</media-hotkey>
<media-hotkey keys="ArrowUp" action="volumeStep">
</media-hotkey>
<media-hotkey keys="ArrowDown" action="volumeStep">
</media-hotkey>
<media-status-announcer class="media-status-announcer">
</media-status-announcer>
</media-container>`);
//#endregion
export { template };
