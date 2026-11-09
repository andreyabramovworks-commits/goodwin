import { createTemplate } from "@videojs/utils/dom";
//#region src/internal/skins/default-audio/template.ts
/** Static template rendered from the finalized VJSC module graph. */
const template = createTemplate(`<media-container class="media-skin media-container audio-skin" data-theme="default" data-preset="audio">
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
<media-icon name="spinner" class="media-buffering-indicator-spinner-icon">
</media-icon>
</media-buffering-indicator>
<media-play-button class="media-button media-play-button" id="vjs-YCBr5ls1-0-trigger">
<media-icon name="restart" class="media-button-icon media-play-button-restart-icon">
</media-icon>
<media-icon name="play" class="media-button-icon media-play-button-play-icon">
</media-icon>
<media-icon name="pause" class="media-button-icon media-play-button-pause-icon">
</media-icon>
</media-play-button>
<media-tooltip trigger="vjs-YCBr5ls1-0-trigger" boundary="viewport" side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
</div>
<media-seek-button seconds="-10" class="media-button media-seek-button audio-seek-button" id="vjs-YCBr5ls1-0-2-trigger">
<div class="media-seek-button-content">
<media-icon name="seek" class="media-button-icon media-seek-button-backward-icon">
</media-icon>
<span class="media-seek-button-label media-seek-button-backward-label">10</span>
</div>
</media-seek-button>
<media-tooltip trigger="vjs-YCBr5ls1-0-2-trigger" boundary="viewport" side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-seek-button seconds="10" class="media-button media-seek-button audio-seek-button" id="vjs-YCBr5ls1-0-3-trigger">
<div class="media-seek-button-content">
<media-icon name="seek" class="media-button-icon">
</media-icon>
<span class="media-seek-button-label media-seek-button-forward-label">10</span>
</div>
</media-seek-button>
<media-tooltip trigger="vjs-YCBr5ls1-0-3-trigger" boundary="viewport" side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
</media-controls-group>
<media-controls-group class="audio-time-slider-group">
<media-time class="media-time-value" type="current">
</media-time>
<media-time-slider class="media-slider audio-time-slider">
<media-slider-track class="media-slider-track">
<media-slider-buffer class="media-slider-buffer">
</media-slider-buffer>
<media-slider-fill class="media-slider-fill">
</media-slider-fill>
</media-slider-track>
<media-slider-thumb class="media-slider-thumb audio-time-slider-thumb">
</media-slider-thumb>
<media-slider-preview class="media-slider-preview" overflow="visible">
<div class="media-slider-preview-content media-popup-surface media-tooltip audio-time-slider-preview-content">
<media-slider-value class="audio-time-slider-value" type="pointer">
</media-slider-value>
</div>
</media-slider-preview>
</media-time-slider>
<media-time class="media-time-toggle audio-time-remaining-value" type="remaining" toggle>
</media-time>
</media-controls-group>
<media-controls-group class="audio-controls-end">
<media-playback-rate-button commandfor="vjs-IYqgEwNi-0-popup" class="media-button media-playback-rate-button" id="vjs-YCBr5ls1-0-4-trigger">
</media-playback-rate-button>
<media-tooltip trigger="vjs-YCBr5ls1-0-4-trigger" boundary="viewport" side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-menu side="top" align="center" boundary="viewport" class="media-popup media-popup-surface media-menu-popup audio-settings-menu-popup" id="vjs-IYqgEwNi-0-popup">
<media-menu-content class="media-menu-content">
<media-playback-rate-radio-group class="media-menu-radio-group">
<template>
<media-menu-radio-item class="media-menu-radio-item">
<span data-part="label">
</span>
<media-menu-item-indicator force-mount class="media-menu-item-indicator">
<media-icon name="check" class="media-menu-radio-item-icon">
</media-icon>
</media-menu-item-indicator>
</media-menu-radio-item>
</template>
</media-playback-rate-radio-group>
</media-menu-content>
</media-menu>
<media-mute-button commandfor="vjs-vz1xrwnK-0-popup" class="media-button media-mute-button" id="vjs-YCBr5ls1-0-5-trigger">
<media-icon name="volume-off" class="media-button-icon media-mute-button-off-icon">
</media-icon>
<media-icon name="volume-low" class="media-button-icon media-mute-button-low-icon">
</media-icon>
<media-icon name="volume-high" class="media-button-icon media-mute-button-high-icon">
</media-icon>
</media-mute-button>
<media-tooltip trigger="vjs-YCBr5ls1-0-5-trigger" delay="0" disabled sticky side="top" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-tooltip">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-volume-popover open-on-hover delay="200" close-delay="100" side="top" boundary="viewport" class="media-popup media-popup-safe-area media-popup-transition media-popup-surface media-volume-popover" id="vjs-vz1xrwnK-0-popup">
<media-volume-slider class="media-slider media-volume-slider" thumb-alignment="edge" orientation="vertical">
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
