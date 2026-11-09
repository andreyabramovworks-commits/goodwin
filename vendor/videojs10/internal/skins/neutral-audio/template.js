import { createTemplate } from "@videojs/utils/dom";
//#region src/internal/skins/neutral-audio/template.ts
/** Static template rendered from the finalized VJSC module graph. */
const template = createTemplate(`<media-container class="media-skin media-container audio-skin" data-theme="neutral" data-preset="audio">
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
<media-play-button class="media-button media-play-button" id="vjs-W_MfTVYB-0-trigger">
<media-icon family="neutral" name="restart" class="media-button-icon media-play-button-restart-icon">
</media-icon>
<media-icon family="neutral" name="play" class="media-button-icon media-play-button-play-icon">
</media-icon>
<media-icon family="neutral" name="pause" class="media-button-icon media-play-button-pause-icon">
</media-icon>
</media-play-button>
<media-tooltip trigger="vjs-W_MfTVYB-0-trigger" boundary="viewport" side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
</div>
<media-seek-button seconds="-10" class="media-button media-seek-button" id="vjs-W_MfTVYB-0-2-trigger">
<div class="media-seek-button-content">
<media-icon family="neutral" name="seek" class="media-button-icon media-seek-button-backward-icon">
</media-icon>
<span class="media-seek-button-label media-seek-button-backward-label">10</span>
</div>
</media-seek-button>
<media-tooltip trigger="vjs-W_MfTVYB-0-2-trigger" boundary="viewport" side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-seek-button seconds="10" class="media-button media-seek-button" id="vjs-W_MfTVYB-0-3-trigger">
<div class="media-seek-button-content">
<media-icon family="neutral" name="seek" class="media-button-icon">
</media-icon>
<span class="media-seek-button-label media-seek-button-forward-label">10</span>
</div>
</media-seek-button>
<media-tooltip trigger="vjs-W_MfTVYB-0-3-trigger" boundary="viewport" side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
</media-controls-group>
<media-controls-group class="audio-time-slider-group">
<media-time-group class="media-time-group">
<media-time class="media-time-toggle" type="current" toggle>
</media-time>
<media-time-separator class="media-time-separator">
</media-time-separator>
<media-time class="media-time-duration-value" type="duration">
</media-time>
</media-time-group>
<media-time-slider class="media-slider audio-time-slider">
<media-slider-track class="media-slider-track">
<media-slider-buffer class="media-slider-buffer">
</media-slider-buffer>
<media-slider-fill class="media-slider-fill">
</media-slider-fill>
</media-slider-track>
<media-slider-thumb class="media-slider-thumb audio-time-slider-thumb">
</media-slider-thumb>
<media-slider-preview class="media-slider-preview" overflow="clamp">
<div class="media-slider-preview-content media-popup-surface media-tooltip audio-time-slider-preview-content">
<media-slider-value class="audio-time-slider-value" type="pointer">
</media-slider-value>
</div>
</media-slider-preview>
</media-time-slider>
</media-controls-group>
<media-controls-group class="audio-controls-end">
<media-mute-button commandfor="vjs-4kthzEOq-0-popup" class="media-button media-mute-button" id="vjs-W_MfTVYB-0-4-trigger">
<media-icon family="neutral" name="volume-off" class="media-button-icon media-mute-button-off-icon">
</media-icon>
<media-icon family="neutral" name="volume-low" class="media-button-icon media-mute-button-low-icon">
</media-icon>
<media-icon family="neutral" name="volume-high" class="media-button-icon media-mute-button-high-icon">
</media-icon>
</media-mute-button>
<media-tooltip trigger="vjs-W_MfTVYB-0-4-trigger" delay="0" sticky side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-volume-popover open-on-hover delay="200" close-delay="100" side="left" boundary="viewport" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-volume-popover" id="vjs-4kthzEOq-0-popup">
<media-volume-slider class="media-slider media-volume-slider" thumb-alignment="edge" orientation="horizontal">
<media-slider-track class="media-slider-track">
<media-slider-fill class="media-slider-fill">
</media-slider-fill>
</media-slider-track>
<media-slider-thumb class="media-slider-thumb media-volume-slider-thumb">
</media-slider-thumb>
</media-volume-slider>
</media-volume-popover>
<media-playback-rate-button commandfor="vjs-ALt053S7-0-popup" class="media-button media-playback-rate-button" id="vjs-W_MfTVYB-0-5-trigger">
</media-playback-rate-button>
<media-tooltip trigger="vjs-W_MfTVYB-0-5-trigger" boundary="viewport" side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-menu side="top" align="center" boundary="viewport" class="media-popup media-popup-surface media-menu-popup audio-settings-menu-popup" id="vjs-ALt053S7-0-popup">
<media-menu-content class="media-menu-content">
<media-playback-rate-radio-group class="media-menu-radio-group">
<template>
<media-menu-radio-item class="media-menu-radio-item">
<span data-part="label">
</span>
<media-menu-item-indicator force-mount class="media-menu-item-indicator">
<media-icon family="neutral" name="check" class="media-menu-radio-item-icon">
</media-icon>
</media-menu-item-indicator>
</media-menu-radio-item>
</template>
</media-playback-rate-radio-group>
</media-menu-content>
</media-menu>
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
<media-hotkey keys="ArrowRight" action="seekStep">
</media-hotkey>
<media-hotkey keys="ArrowLeft" action="seekStep">
</media-hotkey>
<media-hotkey keys="l" action="seekStep">
</media-hotkey>
<media-hotkey keys="j" action="seekStep">
</media-hotkey>
<media-hotkey keys="ArrowUp" action="volumeStep">
</media-hotkey>
<media-hotkey keys="ArrowDown" action="volumeStep">
</media-hotkey>
<media-hotkey keys="0-9" action="seekToPercent">
</media-hotkey>
<media-hotkey keys="Home" action="seekToPercent" value="0">
</media-hotkey>
<media-hotkey keys="End" action="seekToPercent" value="100">
</media-hotkey>
<media-hotkey keys="&gt;" action="speedUp">
</media-hotkey>
<media-hotkey keys="&lt;" action="speedDown">
</media-hotkey>
<media-status-announcer class="media-status-announcer">
</media-status-announcer>
</media-container>`);
//#endregion
export { template };
