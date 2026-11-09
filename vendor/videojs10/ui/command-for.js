//#region src/ui/command-for.ts
/** Toggle a popup host linked via `commandfor` (menu, popover, etc.). */
function toggleCommandTarget(host, commandfor) {
	const root = host.getRootNode();
	const target = ("getElementById" in root ? root.getElementById(commandfor) : null) ?? root.querySelector(`#${CSS.escape(commandfor)}`);
	if (!target || !("open" in target)) return;
	const popup = target;
	popup.open = !popup.open;
}
//#endregion
export { toggleCommandTarget };
