import { containerContext, extensionContext, mediaContext, playerContext } from "./context.js";
import { createPlayerController } from "./controller.js";
import { createPlayerElement } from "./element.js";
import { combinePlayerFeatureConfigs } from "@videojs/core/dom";
import { combine, createStore } from "@videojs/store";
//#region src/player/create-player.ts
function createPlayer(config) {
	const slice = combine(...config.features);
	const featureConfig = combinePlayerFeatureConfigs(config.features);
	return {
		PlayerElement: createPlayerElement({
			playerContext,
			mediaContext,
			containerContext,
			extensionContext,
			factory: () => createStore()(slice),
			config: featureConfig
		}),
		PlayerController: createPlayerController(playerContext),
		playerContext
	};
}
//#endregion
export { createPlayer };
