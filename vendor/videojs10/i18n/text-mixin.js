import { I18nController } from "./controller.js";
import { translateText } from "@videojs/core/i18n";
//#region src/i18n/text-mixin.ts
function createTextMixin({ context }) {
	return (Base) => {
		class MediaText extends Base {
			constructor(..._args) {
				super(..._args);
				this.#i18n = new I18nController(this, context);
				this.token = "";
			}
			static {
				this.properties = { token: { type: String } };
			}
			#i18n;
			#text;
			connectedCallback() {
				this.#text ??= this.textContent?.trim() ?? "";
				super.connectedCallback();
			}
			updated(changed) {
				super.updated(changed);
				if (!this.#text) {
					this.textContent = "";
					return;
				}
				const text = this.token ? {
					key: this.token,
					text: this.#text
				} : this.#text;
				this.textContent = typeof text === "string" ? text : translateText(text, this.#i18n.value);
			}
		}
		return MediaText;
	};
}
//#endregion
export { createTextMixin };
