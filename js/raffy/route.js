define(function () {
	var topp = window.top;
	
	function isInsideFrame() {
		// See: http://stackoverflow.com/a/326076
		try { return window.self !== window.top; } 
		catch (e) { return true; }
	}
	
	console.dir(topp);
	return {};
	
});