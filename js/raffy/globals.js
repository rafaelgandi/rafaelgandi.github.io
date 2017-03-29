define(['vendor/domReady!'], function () {	
	return {
		root: $(document),
		$pageContainer: $('section.page_container'),
		$pages: {
			introPage : $('#intro_page'),
			photograffyPage : $('#photograffy_page'),
			weaponsPage : $('#weapons_page'),
			contactPage : $('#contact_page'),
			projectsPage : $('#projects_page')
		},
		$navigationCon: $('#main_navigation_con'),
		PAGE_NO_CONTENTS_CLASS: 'raffy_no_contents',
		GITHUB_URI: 'http://rafaelgandi.github.io',
		BLOG_URI: 'https://medium.com/rafael-gandionco'
	};	
});