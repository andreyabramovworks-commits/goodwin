import { createContext } from "@videojs/element/context";
//#region src/player/context.ts
const PLAYER_CONTEXT_KEY = Symbol.for("@videojs/player");
/**
* The default player context instance for consuming the player store in controllers.
*
* @public
*/
const playerContext = createContext(PLAYER_CONTEXT_KEY);
/** @internal */
const MEDIA_CONTEXT_KEY = Symbol.for("@videojs/media");
/** @internal */
const mediaContext = createContext(MEDIA_CONTEXT_KEY);
/** @internal */
const CONTAINER_CONTEXT_KEY = Symbol.for("@videojs/container");
/** @internal */
const containerContext = createContext(CONTAINER_CONTEXT_KEY);
/** @internal */
const EXTENSION_CONTEXT_KEY = Symbol.for("@videojs/extension");
/** @internal */
const extensionContext = createContext(EXTENSION_CONTEXT_KEY);
//#endregion
export { CONTAINER_CONTEXT_KEY, EXTENSION_CONTEXT_KEY, MEDIA_CONTEXT_KEY, PLAYER_CONTEXT_KEY, containerContext, extensionContext, mediaContext, playerContext };
