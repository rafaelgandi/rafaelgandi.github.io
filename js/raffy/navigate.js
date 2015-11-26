define(['vendor/domReady!', 'raffy/globals'], function (domReady, globals) {
	var ACTIVE_PAGE_CLASS = 'raffy_active_page',
		ACTIVE_NAVLINK_CLASS = 'active_nav';
		
	function _setActiveMainLink(_pageId) {
		// See: http://api.jquery.com/attribute-ends-with-selector/
		globals.$navigationCon.find('a')
			.removeClass(ACTIVE_NAVLINK_CLASS)
			.filter('a[href$="'+_pageId+'"]')
				.addClass(ACTIVE_NAVLINK_CLASS);
	}
	
	// Navigate to page function
	globals.navigateToPage = function (_pageId) {
		var id = _pageId.replace(/.*#/ig, ''),
			$page = $('#'+id);
		if (! $page.length) {
			throw 'No page found "'+id+'"';
		}		
		globals.$pageContainer.stop().hide().removeClass(ACTIVE_PAGE_CLASS);
		scrollTo(0,0);
		$page.stop().hide().fadeIn();
		//globals.root.trigger(id, [$page]);
		globals.root.trigger('pagechange', [$page]);
		_setActiveMainLink(id);
	};
	
	var Events = {
		navigateToOtherPage: function (e) {
			e.preventDefault();
			globals.navigateToPage(this.href);
			return false;
		}
	};
	
	globals.root.on('click', 'a.nav_link', Events.navigateToOtherPage);
});