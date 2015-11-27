/* 
	Module to check if website is being viewed inside a frame and is on mobile.
 */
define(function () {
	function isInsideFrame() {
		// See: http://stackoverflow.com/a/326076
		try {
			return window.self !== window.top;
		} catch (e) {
			return true;
		}
	}
	
	function isMobile() {
		// See: http://stackoverflow.com/a/14301832
		return typeof window.orientation !== 'undefined';
	}

	return {
		ifTrue: function (_callback) {
			_callback = _callback || function () {};
			// If is inside a frame and on mobile //
			if (isInsideFrame() && isMobile()) {
				_callback();
			}
		}
	};
});