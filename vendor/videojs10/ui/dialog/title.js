import { dialogContext } from "./context.js";
import { ContextPartElement } from "../context-part-element.js";
import { ContextConsumer } from "@videojs/element/context";
//#region src/ui/dialog/title.ts
/** Text that labels its owning dialog. The element takes the `id` that the popup's `aria-labelledby` points to. */
var DialogTitleElement = class extends ContextPartElement {
	constructor(..._args) {
		super(..._args);
		this.consumer = new ContextConsumer(this, {
			context: dialogContext,
			subscribe: true
		});
	}
	static {
		this.tagName = "media-dialog-title";
	}
	update(changed) {
		super.update(changed);
		const titleId = this.consumer.value?.state.titleId;
		if (titleId) this.id = titleId;
	}
};
//#endregion
export { DialogTitleElement };
