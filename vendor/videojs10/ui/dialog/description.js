import { dialogContext } from "./context.js";
import { ContextPartElement } from "../context-part-element.js";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/dialog/description.ts
/**
* Text announced as its owning dialog's description. The element takes the `id` that the popup's `aria-describedby`
* points to.
*/
var DialogDescriptionElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: dialogContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-dialog-description";
	}
	update(changed) {
		super.update(changed);
		const descriptionId = this.consumer.value?.state.descriptionId;
		if (descriptionId) this.id = descriptionId;
	}
};
//#endregion
export { DialogDescriptionElement };
