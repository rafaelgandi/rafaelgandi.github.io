define(['vendor/domReady!', 'raffy/globals', 'raffy/navigate'], function (domReady, globals, navigate) {
	var topp = window.top,
		routeList = {},
		routeListReverse = {},
		landingPageId = '';
	
	function isInsideFrame() {
		// See: http://stackoverflow.com/a/326076
		try { return window.self !== window.top; } 
		catch (e) { return true; }
	}
	
	function getCurrentUri() {
		// See: https://www.nczonline.net/blog/2013/04/16/getting-the-url-of-an-iframes-parent/
		if (isInsideFrame()) {
			return document.referrer;
		}
		return self.location.href;
	}
	
	function setDefaultLanding(_pageId) {
		landingPageId = _pageId;
	}
	
	function reverseRouteList() {
		for (var r in routeList) {
			routeListReverse[routeList[r]] = r;
		}
		return routeListReverse;	
	}
	
	function init(_routes) {
		var currentUri = getCurrentUri();
		routeList = _routes;
		reverseRouteList();
		for (var r in _routes) {
			if (currentUri.indexOf(r) !== -1) {
				navigate.goToPage(_routes[r]);
				return;
			}
		}
		navigate.goToPage(landingPageId);
	}
	
	globals.root.on('pagechange', function (e, $page) {		
		var pageId = $.trim($page.attr('id').replace(/.*#/ig, ''));
		if (routeListReverse[pageId]) {		
			window.location.hash = routeListReverse[pageId];	
		}
	});
	
	return {
		setDefaultLanding: setDefaultLanding,
		init: init
	};
	
});