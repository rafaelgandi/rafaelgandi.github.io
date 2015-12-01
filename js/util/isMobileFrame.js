/* 
	Module to check if website is being viewed inside a frame and is on mobile.
 */
define(['util/frame', 'util/mobile'], function (frame, mobile) {
	return {
		ifTrue: function (_callback) {
			_callback = _callback || function () {};
			// If is inside a frame and on mobile //
			if (frame.isInsideFrame() && mobile.isMobile()) {
				_callback();
			}
		}
	};
});