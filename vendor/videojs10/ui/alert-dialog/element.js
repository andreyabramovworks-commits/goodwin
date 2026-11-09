import { DialogElementBase } from "../dialog/element.js";
import { AlertDialogCore, AlertDialogDataAttrs } from "@videojs/core";
//#region src/ui/alert-dialog/element.ts
/**
* A modal dialog with alert semantics.
*
* @fires open-change - Fired when the dialog's open state changes.
*/
var AlertDialogElement = class extends DialogElementBase {
	static {
		this.tagName = "media-alert-dialog";
	}
	constructor() {
		super({
			core: new AlertDialogCore(),
			stateAttrMap: AlertDialogDataAttrs,
			idPrefix: "alert-dialog",
			bindTrigger: false
		});
	}
};
//#endregion
export { AlertDialogElement };
