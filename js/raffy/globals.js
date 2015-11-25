define(['vendor/domReady!'], function () {
	window.$ = window.jQuery;
	var ACTIVE_PAGE_CLASS = 'raffy_active_page',
		ACTIVE_NAVLINK_CLASS = 'active_nav';
	var props = {
		root: $(document),
		scrollToOpt: {
			easing:'easeOutCubic'
		},
		$pageContainer: $('section.page_container'),
		$pages: {
			introPage : $('#intro_page'),
			photograffyPage : $('#photograffy_page')
		},
		$contactUsOtherLinksCon: $('#contactus_other_links'),
		$navigationCon: $('#main_navigation_con'),
		PAGE_NO_CONTENTS_CLASS: 'raffy_no_contents'
	};
	
	function _setActiveMainLink(_pageId) {
		// See: http://api.jquery.com/attribute-ends-with-selector/
		props.$navigationCon.find('a')
			.removeClass(ACTIVE_NAVLINK_CLASS)
			.filter('a[href$="'+_pageId+'"]')
				.addClass(ACTIVE_NAVLINK_CLASS);
	}
	
	// Navigate to page function
	props.navigateToPage = function (_pageId) {
		var id = _pageId.replace(/.*#/ig, ''),
			$page = $('#'+id);
		if (! $page.length) {
			throw 'No page found "'+id+'"';
		}
		props.$pageContainer.stop().fadeOut(100, function () {
			props.$pageContainer.removeClass(ACTIVE_PAGE_CLASS);
			$page.stop().hide().fadeIn(100);
			//props.root.trigger(id, [$page]);
			
		});
		props.root.trigger('pagechange', [$page]);
		_setActiveMainLink(id);
	};
	
	var Events = {
		navigateToOtherPage: function (e) {
			e.preventDefault();
			props.navigateToPage(this.href);
			return false;
		}
	};
	
	props.root.on('click', 'a.nav_link', Events.navigateToOtherPage);
	
		
	return props;	
});