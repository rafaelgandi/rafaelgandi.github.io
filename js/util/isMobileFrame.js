/* 
	Module to check if website is being viewed inside a frame and is on mobile.
 */
define(function () {
	var width = 0;
	
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
	
	width = getScreenWidth();
	alert(width);
	alert(isInsideFrame());
});