/* 
	Module to check for mobiles
 */
define(function () {	
	return {
		isMobile: function () {
			// See: http://stackoverflow.com/a/14301832
			return typeof window.orientation !== 'undefined';
		}
	};
});