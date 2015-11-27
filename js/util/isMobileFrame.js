/* 
	Module to check if website is being viewed inside a frame and is on mobile.
 */
define(function () {
	var screenWidth = 0,
		inFrame = false,
		mobileThreshold = 568;
	
	function getScreenWidth() {
		return self.innerWidth || d.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth;
	}
	
	function isInsideFrame() {
		// See: http://stackoverflow.com/a/326076
		try {
			return window.self !== window.top;
		} catch (e) {
			return true;
		}
	}
	
	function isMobile() {
		return typeof window.orientation !== 'undefined';
	}
	
	screenWidth = getScreenWidth();
	inFrame = isInsideFrame();
	
	//console.warn(screenWidth);
	//console.info(screen.width);
	
	alert(isMobile());
	
	return {
		screenWidth: screenWidth,
		inFrame: inFrame,
		ifTrue: function (_callback) {
			_callback = _callback || function () {};
			// If is inside a frame and on mobile //
			if (inFrame && (screenWidth <= mobileThreshold)) {
				_callback();
			}
		}
	};
});