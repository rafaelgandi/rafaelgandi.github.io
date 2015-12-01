/* 
	raffy.js
	LM: 2015-12-01
	Author: Rafael Gandionco
		
		    __         __
           /.-'       `-.\
          //             \\
         /j_______________j\
        /o.-==-. .-. .-==-.o\
        ||      )) ((      ||
         \\____//   \\____//   
          `-==-'     `-==-'
*/
requirejs.config({
    baseUrl: 'js',
    paths: {}
});
window.$ = window.jQuery; // Explicitly map the "$" sign to jQuery.
require([
	'util/Array.forEach', 
	'raffy/globals', 
	'raffy/navigate', 
	'util/isMobileFrame',
	'raffy/route'
], function (undef, globals, navigate, isMobileFrame) {
	// Breakout of frame if in mobile and in frameset (.tk) //
	isMobileFrame.ifTrue(function () {
		window.top.location.href = globals.GITHUB_URI;
	});
	var pageModules = {
		'intro_page': 'raffy/page/introPage',
		'photograffy_page': 'raffy/page/photograffyPage',
		'weapons_page': 'raffy/page/weaponsPage',
		'projects_page': 'raffy/page/projectsPage',
		'contact_page': 'raffy/page/contactPage'
	};
	// Load intro page scripts //
	require([pageModules['intro_page']]);	
	// Load contents for the page //
	globals.root.on('pagechange', function (e, $page) {
		if ($page.hasClass(globals.PAGE_NO_CONTENTS_CLASS)) {
			var pageId = $page.attr('id');
			if (!! pageModules[pageId]) {
				// Load the page modules //
				require([pageModules[pageId]]);
				delete pageModules[pageId];
			}
		}
	});
});