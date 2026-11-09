import { DestroyMixin, ReactiveElement } from "@videojs/element";
//#region src/ui/ui-element.ts
/** Base class for interactive media UI elements. */
var UIElement = class extends DestroyMixin(ReactiveElement) {};
//#endregion
export { UIElement };
