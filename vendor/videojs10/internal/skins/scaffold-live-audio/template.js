import { createTemplate } from "@videojs/utils/dom";
//#region src/internal/skins/scaffold-live-audio/template.ts
/** Static template rendered from the finalized VJSC module graph. */
const template = createTemplate(`<media-container class="media-skin media-container media-audio" data-theme="scaffold" data-preset="live-audio">
<slot>
</slot>
<media-error-dialog>
<media-dialog-backdrop class="media-dialog-backdrop">
</media-dialog-backdrop>
<media-dialog-popup class="media-dialog-popup">
<media-dialog-title class="media-dialog-title">
</media-dialog-title>
<media-dialog-description class="media-dialog-description">
</media-dialog-description>
<media-dialog-close class="media-button media-dialog-close">
</media-dialog-close>
</media-dialog-popup>
</media-error-dialog>
<media-controls visibility="always">
<media-controls-content class="video-controls-content audio-controls-content">
<media-tooltip-group>
<div class="video-controls-bottom audio-controls-bottom">
<media-controls-group class="video-controls-row">
<media-controls-group class="video-controls-group video-controls-start">
<div class="media-play-button-audio">
<media-play-button class="media-button media-play-button" id="vjs-r7DX1drE-0-trigger">
<media-icon family="scaffold" name="restart" class="media-button-icon-base media-play-button-restart-icon">
</media-icon>
<media-icon family="scaffold" name="play" class="media-button-icon-base media-play-button-play-icon">
</media-icon>
<media-icon family="scaffold" name="pause" class="media-button-icon-base media-play-button-pause-icon">
</media-icon>
</media-play-button>
<media-tooltip trigger="vjs-r7DX1drE-0-trigger" side="top" class="media-popup media-popup-safe-area media-tooltip-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-buffering-indicator class="media-buffering-indicator media-play-button-buffering">
<media-icon family="scaffold" name="spinner" class="media-buffering-indicator-spinner-icon">
</media-icon>
</media-buffering-indicator>
</div>
<media-live-button class="media-button media-live-button">
<div aria-hidden="true" class="media-live-button-dot">
</div>
<media-text token="live.badge">Live</media-text>
</media-live-button>
</media-controls-group>
<media-controls-group class="video-controls-group">
<media-mute-button commandfor="vjs-igUPvPeL-0-popup" class="media-button media-mute-button" id="vjs-r7DX1drE-0-2-trigger">
<media-icon family="scaffold" name="volume-off" class="media-button-icon media-mute-button-off-icon">
</media-icon>
<media-icon family="scaffold" name="volume-high" class="media-button-icon media-mute-button-high-icon">
</media-icon>
</media-mute-button>
<media-tooltip trigger="vjs-r7DX1drE-0-2-trigger" delay="0" disabled side="top" sticky class="media-popup media-popup-safe-area media-tooltip-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-volume-popover open-on-hover delay="200" close-delay="100" side="top" class="media-popup media-popup-safe-area media-volume-popover-popup" id="vjs-igUPvPeL-0-popup">
<media-volume-slider class="media-volume-slider" orientation="vertical" thumb-alignment="edge">
<media-slider-track class="media-volume-slider-track">
<media-slider-fill class="media-volume-slider-fill">
</media-slider-fill>
</media-slider-track>
<media-slider-thumb class="media-volume-slider-thumb">
</media-slider-thumb>
</media-volume-slider>
</media-volume-popover>
</media-controls-group>
</media-controls-group>
</div>
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
