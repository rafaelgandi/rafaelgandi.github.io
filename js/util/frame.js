/* 
	Module to check for frames
 */
define(function () {
	return {
		isInsideFrame: function () {
			// See: http://stackoverflow.com/a/326076
			try { return window.self !== window.top; } 
			catch (e) { return true; }
		}
	};
});