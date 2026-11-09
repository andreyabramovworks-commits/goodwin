//#region ../icons/dist/element/base.js
const HTMLElementBase = globalThis.HTMLElement ?? class {};
/** Renders registered SVG icon families in the light DOM. */
var MediaIconElement = class MediaIconElement extends HTMLElementBase {
	static #families = /* @__PURE__ */ new Map();
	static #loaders = /* @__PURE__ */ new Map();
	static #loading = /* @__PURE__ */ new Map();
	static #instances = /* @__PURE__ */ new Set();
	static register(family, icons) {
		const familyIcons = MediaIconElement.#families.get(family) ?? /* @__PURE__ */ new Map();
		for (const [name, svg] of Object.entries(icons)) familyIcons.set(name, svg);
		MediaIconElement.#families.set(family, familyIcons);
		for (const icon of MediaIconElement.#instances) if (icon.#family === family) icon.#render();
	}
	static registerLoader(family, load) {
		MediaIconElement.#loaders.set(family, load);
		for (const icon of MediaIconElement.#instances) if (icon.#family === family) icon.#render();
	}
	static load(family) {
		if (MediaIconElement.#families.has(family)) return Promise.resolve();
		const pending = MediaIconElement.#loading.get(family);
		if (pending) return pending;
		const loader = MediaIconElement.#loaders.get(family);
		if (!loader) return Promise.resolve();
		const loading = Promise.resolve().then(loader).then((icons) => MediaIconElement.register(family, icons)).finally(() => MediaIconElement.#loading.delete(family));
		MediaIconElement.#loading.set(family, loading);
		return loading;
	}
	static get observedAttributes() {
		return ["name", "family"];
	}
	connectedCallback() {
		MediaIconElement.#instances.add(this);
		this.#render();
	}
	disconnectedCallback() {
		MediaIconElement.#instances.delete(this);
	}
	attributeChangedCallback() {
		this.#render();
	}
	get #family() {
		return this.getAttribute("family") || "default";
	}
	#render() {
		if (!this.isConnected) return;
		const name = this.getAttribute("name");
		const family = this.#family;
		const familyIcons = MediaIconElement.#families.get(family);
		const svg = name ? familyIcons?.get(name) : void 0;
		if (svg !== void 0) {
			if (this.innerHTML !== svg) this.innerHTML = svg;
			return;
		}
		this.replaceChildren();
		if (familyIcons || !name || !MediaIconElement.#loaders.has(family)) return;
		MediaIconElement.load(family).then(() => {
			if (this.isConnected && this.getAttribute("name") === name && this.#family === family) this.#render();
		}, () => {});
	}
};
//#endregion
export { MediaIconElement };
