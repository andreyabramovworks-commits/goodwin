import { UIElement } from "../ui/ui-element.js";
import { PlayerExtensionCoordinator, setPlayerConfigValue } from "@videojs/core/dom";
import { ContextProvider } from "@videojs/element/context";
import { camelCase, kebabCase } from "@videojs/utils/string";
import { isNull } from "@videojs/utils/predicate";
//#region src/player/element.ts
function resolveInputs(config) {
	return Object.entries(config).map(([key, entry]) => {
		const attribute = entry.html?.attribute ?? kebabCase(key);
		return {
			property: camelCase(attribute),
			attribute,
			entry
		};
	});
}
function createPlayerElement(options) {
	const inputs = resolveInputs(options.config);
	class ConfiguredPlayerElement extends UIElement {
		static {
			this.properties = {
				...UIElement.properties,
				...Object.fromEntries(inputs.map(({ property, attribute }) => [property, {
					type: String,
					attribute
				}]))
			};
		}
		#store = options.factory();
		#configuredStore = null;
		#detach = null;
		#connected = false;
		#media = null;
		#nativeMedia = null;
		#container = null;
		#attached = null;
		#mediaRegistrations = [];
		#containerRegistrations = [];
		#observer = new MutationObserver(() => this.#syncNativeMedia());
		#extensions = new PlayerExtensionCoordinator(() => this.#syncExtensions());
		#registerExtension = (extension) => this.#extensions.register(extension);
		#registerMedia = (media) => {
			const registration = { value: media };
			this.#mediaRegistrations.push(registration);
			this.#syncMedia();
			return () => {
				const index = this.#mediaRegistrations.indexOf(registration);
				if (index < 0) return;
				this.#mediaRegistrations.splice(index, 1);
				this.#syncNativeMedia();
				this.#syncMedia();
			};
		};
		#registerContainer = (container) => {
			const registration = { value: container };
			this.#containerRegistrations.push(registration);
			this.#syncContainer();
			return () => {
				const index = this.#containerRegistrations.indexOf(registration);
				if (index < 0) return;
				this.#containerRegistrations.splice(index, 1);
				this.#syncContainer();
			};
		};
		#playerProvider = new ContextProvider(this, {
			context: options.playerContext,
			initialValue: this.store
		});
		#mediaProvider = new ContextProvider(this, {
			context: options.mediaContext,
			initialValue: {
				media: this.#media,
				registerMedia: this.#registerMedia
			}
		});
		#containerProvider = new ContextProvider(this, {
			context: options.containerContext,
			initialValue: {
				container: this.#container,
				registerContainer: this.#registerContainer
			}
		});
		constructor() {
			super();
			new ContextProvider(this, {
				context: options.extensionContext,
				initialValue: { registerExtension: this.#registerExtension }
			});
		}
		get store() {
			if (isNull(this.#store)) this.#store = options.factory();
			return this.#store;
		}
		connectedCallback() {
			this.#connected = true;
			super.connectedCallback();
			this.#syncInitialConfig();
			this.#playerProvider.setValue(this.store);
			this.#publishMedia();
			this.#publishContainer();
			this.#observer.observe(this, {
				childList: true,
				subtree: true
			});
			queueMicrotask(() => {
				if (this.#connected) this.#syncNativeMedia();
			});
			this.#tryAttach();
		}
		disconnectedCallback() {
			this.#connected = false;
			this.#observer.disconnect();
			this.#detachStore();
			super.disconnectedCallback();
		}
		destroyCallback() {
			this.#observer.disconnect();
			this.#detachStore();
			this.#extensions.destroy();
			this.#store?.destroy();
			this.#store = null;
			super.destroyCallback();
		}
		willUpdate(changed) {
			super.willUpdate(changed);
			for (const { property, entry } of inputs) {
				if (!changed.has(property)) continue;
				const configProperty = property;
				setPlayerConfigValue(this.store, entry, this[configProperty]);
			}
		}
		#syncMedia() {
			const media = this.#mediaRegistrations.at(-1)?.value ?? null ?? this.#nativeMedia;
			if (this.#media === media) return;
			this.#media = media;
			this.#publishMedia();
			this.#tryAttach();
		}
		#syncContainer() {
			const container = this.#containerRegistrations.at(-1)?.value ?? null;
			if (this.#container === container) return;
			this.#container = container;
			this.#publishContainer();
			this.#tryAttach();
		}
		#syncNativeMedia() {
			const media = this.querySelector("video, audio");
			if (this.#nativeMedia === media) return;
			this.#nativeMedia = media;
			this.#syncMedia();
		}
		#publishMedia() {
			this.#mediaProvider.setValue({
				media: this.#media,
				registerMedia: this.#registerMedia
			});
		}
		#publishContainer() {
			this.#containerProvider.setValue({
				container: this.#container,
				registerContainer: this.#registerContainer
			});
		}
		#tryAttach() {
			if (!this.#connected || !this.#store) return;
			if (!this.#media) {
				this.#detachStore();
				return;
			}
			const target = {
				media: this.#media,
				container: this.#container
			};
			const hasMediaChanged = this.#attached?.media !== target.media;
			const hasContainerChanged = this.#attached?.container !== target.container;
			if (hasMediaChanged || hasContainerChanged) this.#attach(target);
		}
		/**
		* Extensions attach before the store so their overrides are in place when features first read the media; the store
		* then sees the media through the extensions' facade. Extensions follow the media only, so a container change
		* re-attaches the store but leaves them attached.
		*/
		#attach(target) {
			const store = this.#store;
			if (!store) return;
			this.#detach?.();
			this.#attached = target;
			this.#extensions.attach(target);
			this.#detach = store.attach({
				media: this.#extensions.getStoreMedia(target.media),
				container: target.container
			});
		}
		/**
		* An extension that overrides media members was added or removed. Features hold members read at attach time (such
		* as `remote`), so the store re-attaches to the same target to pick up what the extensions now own. Observers such
		* as analytics never get here. Extensions themselves stay attached.
		*/
		#syncExtensions() {
			if (this.#attached) this.#attach(this.#attached);
		}
		#detachStore() {
			this.#detach?.();
			this.#detach = null;
			this.#extensions.detach();
			this.#attached = null;
		}
		#syncInitialConfig() {
			const store = this.store;
			if (this.#configuredStore === store) return;
			for (const { property, entry } of inputs) {
				const configProperty = property;
				setPlayerConfigValue(store, entry, this[configProperty]);
			}
			this.#configuredStore = store;
		}
	}
	return ConfiguredPlayerElement;
}
//#endregion
export { createPlayerElement };
