// @ts-check

(function () {
	// @ts-expect-error - this function is available in global scope
	const vscode = acquireVsCodeApi();
	const root = document.getElementById('root');
})();
