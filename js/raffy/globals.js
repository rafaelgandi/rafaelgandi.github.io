define(['vendor/domReady!'], function () {
	var props = {
		root: $(document),
		scrollToOpt: {
			easing:'easeOutCubic'
		},
		$pageContainer: $('section.page_container'),
		$pages: {
			introPage : $('#intro_page'),
			photograffyPage : $('#photograffy_page'),
			weaponsPage : $('#weapons_page'),
			contactPage : $('#contact_page'),
			projectsPage : $('#projects_page')
		},
		$contactUsOtherLinksCon: $('#contactus_other_links'),
		$navigationCon: $('#main_navigation_con'),
		PAGE_NO_CONTENTS_CLASS: 'raffy_no_contents'
	};	
	return props;	
});