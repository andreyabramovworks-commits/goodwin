import { PopupPositioner } from "@videojs/core/dom";
//#region src/ui/position-controller.ts
let popupId = 0;
/** Connects a popup element to the shared positioning lifecycle. */
var PositionController = class {
	#host;
	#positioner = new PopupPositioner();
	#implicitBinding = null;
	constructor(host) {
		this.#host = host;
		host.addController(this);
	}
	/** Discover an explicit trigger by ID or one linked via `commandfor`. */
	findTrigger(trigger) {
		const root = this.#host.getRootNode();
		if (root.nodeType !== Node.DOCUMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
			this.#releaseImplicitBinding();
			return null;
		}
		const scopedRoot = root;
		if (trigger) {
			this.#releaseImplicitBinding();
			return scopedRoot.getElementById(trigger);
		}
		if (this.#implicitBinding) {
			const { id, trigger: boundTrigger } = this.#implicitBinding;
			if (this.#host.id === id && boundTrigger.getAttribute("commandfor") === id && this.#host.previousElementSibling === boundTrigger) return boundTrigger;
			this.#releaseImplicitBinding();
		}
		if (this.#host.id) return scopedRoot.querySelector(`[commandfor="${this.#host.id}"]`);
		const adjacent = this.#host.previousElementSibling;
		if (!(adjacent instanceof HTMLElement)) return null;
		if (adjacent.getAttribute("commandfor")) return null;
		const id = nextPopupId(scopedRoot);
		this.#host.id = id;
		adjacent.setAttribute("commandfor", id);
		this.#implicitBinding = {
			id,
			trigger: adjacent
		};
		return adjacent;
	}
	sync(options) {
		this.#positioner.sync({
			...options,
			popup: this.#host
		});
	}
	cleanup() {
		this.#positioner.cleanup();
	}
	hostDisconnected() {
		this.cleanup();
		this.#releaseImplicitBinding();
	}
	hostDestroyed() {
		this.cleanup();
		this.#releaseImplicitBinding();
	}
	#releaseImplicitBinding() {
		const binding = this.#implicitBinding;
		if (!binding) return;
		if (binding.trigger.getAttribute("commandfor") === binding.id) binding.trigger.removeAttribute("commandfor");
		if (this.#host.id === binding.id) this.#host.removeAttribute("id");
		this.#implicitBinding = null;
	}
};
function nextPopupId(root) {
	let id;
	do
		id = `vjs-popup-${++popupId}`;
	while (root.getElementById(id));
	return id;
}
//#endregion
export { PositionController };
