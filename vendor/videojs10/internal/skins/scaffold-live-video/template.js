import { createTemplate } from "@videojs/utils/dom";
//#region src/internal/skins/scaffold-live-video/template.ts
/** Static template rendered from the finalized VJSC module graph. */
const template = createTemplate(`<media-container class="media-skin media-container media-video" data-theme="scaffold" data-preset="live-video">
<slot>
</slot>
<media-poster class="media-poster">
<slot name="poster">
<img alt="" decoding="async" class="media-poster-image">
</slot>
</media-poster>
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
<media-controls>
<media-controls-backdrop class="video-controls-backdrop">
</media-controls-backdrop>
<media-controls-group class="media-buffering-indicator-controls">
<media-buffering-indicator class="media-buffering-indicator media-buffering-indicator-backdrop">
<media-icon family="scaffold" name="spinner" class="media-buffering-indicator-spinner-icon">
</media-icon>
</media-buffering-indicator>
</media-controls-group>
<media-controls-content class="video-controls-content">
<media-tooltip-group>
<media-controls-group class="video-controls-top">
<media-title class="media-title">
</media-title>
<media-airplay-button class="media-button media-airplay-button" id="vjs-edu67hQA-0-trigger">
<media-icon family="scaffold" name="airplay-enter" class="media-button-icon media-airplay-button-enter-icon">
</media-icon>
<media-icon family="scaffold" name="airplay-exit" class="media-button-icon media-airplay-button-exit-icon">
</media-icon>
</media-airplay-button>
<media-tooltip trigger="vjs-edu67hQA-0-trigger" side="top" class="media-popup media-popup-safe-area media-tooltip-popup media-tooltip-screen-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-cast-button class="media-button media-cast-button" id="vjs-edu67hQA-0-2-trigger">
<media-icon family="scaffold" name="cast-enter" class="media-button-icon media-cast-button-enter-icon">
</media-icon>
<media-icon family="scaffold" name="cast-exit" class="media-button-icon media-cast-button-exit-icon">
</media-icon>
</media-cast-button>
<media-tooltip trigger="vjs-edu67hQA-0-2-trigger" side="top" class="media-popup media-popup-safe-area media-tooltip-popup media-tooltip-screen-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-pip-button class="media-button media-pip-button" id="vjs-edu67hQA-0-3-trigger">
<media-icon family="scaffold" name="pip-enter" class="media-button-icon media-pip-button-enter-icon">
</media-icon>
<media-icon family="scaffold" name="pip-exit" class="media-button-icon media-pip-button-exit-icon">
</media-icon>
</media-pip-button>
<media-tooltip trigger="vjs-edu67hQA-0-3-trigger" side="top" class="media-popup media-popup-safe-area media-tooltip-popup media-tooltip-screen-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-fullscreen-button class="media-button media-fullscreen-button" id="vjs-edu67hQA-0-4-trigger">
<media-icon family="scaffold" name="fullscreen-enter" class="media-button-icon media-fullscreen-button-enter-icon">
</media-icon>
<media-icon family="scaffold" name="fullscreen-exit" class="media-button-icon media-fullscreen-button-exit-icon">
</media-icon>
</media-fullscreen-button>
<media-tooltip trigger="vjs-edu67hQA-0-4-trigger" side="top" class="media-popup media-popup-safe-area media-tooltip-popup media-tooltip-screen-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
</media-controls-group>
<media-buffering-indicator class="video-controls-buffering">
<media-controls-group class="video-controls-center">
<media-play-button class="media-button media-play-button video-controls-center-button video-controls-center-play" id="vjs-edu67hQA-0-5-trigger">
<media-icon family="scaffold" name="restart" class="media-button-icon-base media-play-button-restart-icon video-controls-center-play-icon">
</media-icon>
<media-icon family="scaffold" name="play" class="media-button-icon-base media-play-button-play-icon video-controls-center-play-icon">
</media-icon>
<media-icon family="scaffold" name="pause" class="media-button-icon-base media-play-button-pause-icon video-controls-center-play-icon">
</media-icon>
</media-play-button>
<media-tooltip trigger="vjs-edu67hQA-0-5-trigger" disabled side="top" class="media-popup media-popup-safe-area media-tooltip-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
</media-controls-group>
</media-buffering-indicator>
<div class="video-controls-bottom video-controls-video-bottom">
<media-controls-group class="video-controls-row">
<media-controls-group class="video-controls-group video-controls-start">
<media-play-button class="media-button media-play-button" id="vjs-edu67hQA-0-6-trigger">
<media-icon family="scaffold" name="restart" class="media-button-icon-base media-play-button-restart-icon">
</media-icon>
<media-icon family="scaffold" name="play" class="media-button-icon-base media-play-button-play-icon">
</media-icon>
<media-icon family="scaffold" name="pause" class="media-button-icon-base media-play-button-pause-icon">
</media-icon>
</media-play-button>
<media-tooltip trigger="vjs-edu67hQA-0-6-trigger" side="top" class="media-popup media-popup-safe-area media-tooltip-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-live-button class="media-button media-live-button">
<div aria-hidden="true" class="media-live-button-dot">
</div>
<media-text token="live.badge">Live</media-text>
</media-live-button>
<media-mute-button commandfor="vjs-jYkpFTzU-0-popup" class="media-button media-mute-button" id="vjs-edu67hQA-0-7-trigger">
<media-icon family="scaffold" name="volume-off" class="media-button-icon media-mute-button-off-icon">
</media-icon>
<media-icon family="scaffold" name="volume-high" class="media-button-icon media-mute-button-high-icon">
</media-icon>
</media-mute-button>
<media-tooltip trigger="vjs-edu67hQA-0-7-trigger" delay="0" disabled side="top" sticky class="media-popup media-popup-safe-area media-tooltip-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-volume-popover open-on-hover delay="200" close-delay="100" side="top" class="media-popup media-popup-safe-area media-volume-popover-popup" id="vjs-jYkpFTzU-0-popup">
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
<media-controls-group class="video-controls-group">
<media-captions-button commandfor="vjs-SDLjnoCt-0-popup" class="media-button media-captions-button" id="vjs-edu67hQA-0-8-trigger">
<media-icon family="scaffold" name="captions-off" class="media-button-icon media-captions-button-off-icon">
</media-icon>
<media-icon family="scaffold" name="captions-on" class="media-button-icon media-captions-button-on-icon">
</media-icon>
</media-captions-button>
<media-tooltip trigger="vjs-edu67hQA-0-8-trigger" side="top" class="media-popup media-popup-safe-area media-tooltip-popup">
<media-tooltip-label>
</media-tooltip-label>
<media-tooltip-shortcut class="media-tooltip-shortcut">
</media-tooltip-shortcut>
</media-tooltip>
<media-menu side="top" align="center" class="media-popup media-popup-safe-area media-menu-popup" id="vjs-SDLjnoCt-0-popup">
<media-menu-content class="media-menu-content">
<media-captions-radio-group class="media-menu-radio-group">
<template>
<media-menu-radio-item class="media-menu-radio-item">
<span data-part="label">
</span>
<media-menu-item-indicator force-mount class="media-menu-indicator">
<media-icon family="scaffold" name="check" class="media-menu-radio-icon">
</media-icon>
</media-menu-item-indicator>
</media-menu-radio-item>
</template>
</media-captions-radio-group>
</media-menu-content>
</media-menu>
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
<media-hotkey keys="f" action="toggleFullscreen">
</media-hotkey>
<media-hotkey keys="c" action="toggleSubtitles">
</media-hotkey>
<media-hotkey keys="i" action="togglePictureInPicture">
</media-hotkey>
<media-gesture type="tap" action="togglePaused" pointer="mouse" region="center">
</media-gesture>
<media-gesture type="tap" action="toggleControls" pointer="touch">
</media-gesture>
<media-gesture type="doubletap" action="toggleFullscreen" region="center">
</media-gesture>
<media-status-announcer class="media-status-announcer">
</media-status-announcer>
<div aria-hidden="true" class="media-indicator-group">
<media-volume-indicator class="media-indicator media-volume-indicator">
<media-volume-indicator-fill class="media-volume-indicator-fill">
<media-icon family="scaffold" name="volume-high" class="media-volume-indicator-icon media-volume-indicator-high-icon">
</media-icon>
<media-icon family="scaffold" name="volume-low" class="media-volume-indicator-icon media-volume-indicator-low-icon">
</media-icon>
<media-icon family="scaffold" name="volume-off" class="media-volume-indicator-icon media-volume-indicator-off-icon">
</media-icon>
<media-volume-indicator-value class="media-volume-indicator-value">
</media-volume-indicator-value>
</media-volume-indicator-fill>
</media-volume-indicator>
<media-status-indicator actions="toggleSubtitles,toggleFullscreen,togglePictureInPicture" class="media-indicator media-status-indicator">
<media-icon family="scaffold" name="captions-on" class="media-status-indicator-icon media-status-indicator-captions-on-icon">
</media-icon>
<media-icon family="scaffold" name="captions-off" class="media-status-indicator-icon media-status-indicator-captions-off-icon">
</media-icon>
<media-icon family="scaffold" name="fullscreen-enter" class="media-status-indicator-icon media-status-indicator-fullscreen-enter-icon">
</media-icon>
<media-icon family="scaffold" name="fullscreen-exit" class="media-status-indicator-icon media-status-indicator-fullscreen-exit-icon">
</media-icon>
<media-icon family="scaffold" name="pip-enter" class="media-status-indicator-icon media-status-indicator-pip-enter-icon">
</media-icon>
<media-icon family="scaffold" name="pip-exit" class="media-status-indicator-icon media-status-indicator-pip-exit-icon">
</media-icon>
<media-status-indicator-value>
</media-status-indicator-value>
</media-status-indicator>
</div>
</media-container>`);
//#endregion
export { template };
