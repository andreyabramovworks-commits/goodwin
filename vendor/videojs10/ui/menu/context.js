import { radioGroupContext } from "../radio-group/context.js";
import { createContext } from "@videojs/element/context";
//#region src/ui/menu/context.ts
const MENU_CONTEXT_KEY = Symbol("@videojs/menu");
const MENU_GROUP_CONTEXT_KEY = Symbol("@videojs/menu-group");
/** @internal */
const menuContext = createContext(MENU_CONTEXT_KEY);
/** @internal */
const menuGroupContext = createContext(MENU_GROUP_CONTEXT_KEY);
//#endregion
export { menuContext, menuGroupContext, radioGroupContext as menuRadioGroupContext };
