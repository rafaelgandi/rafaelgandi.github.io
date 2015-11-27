/* 
	raffy.js
	LM: 2015-11-27
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
define(['util/Array.forEach', 'raffy/globals', 'raffy/navigate', 'util/isMobileFrame'], function (undef, globals, navigate, isMobileFrame) {
	// Breakout of frame if in mobile and in frameset (.tk) //
	isMobileFrame.ifTrue(function () {
		window.top.location.href = globals.GITHUB_URI;
	});
	// Load intro page scripts //
	require(['raffy/introPage']);
	var pageModules = {
		'photograffy_page': 'raffy/photograffyPage',
		'weapons_page': 'raffy/weaponsPage',
		'projects_page': 'raffy/projectsPage',
		'contact_page': 'raffy/contactPage'
	};
	// Load contents for the page //
	globals.root.on('pagechange', function (e, $page) {
		if ($page.hasClass(globals.PAGE_NO_CONTENTS_CLASS)) {
			var pageId = $page.attr('id');
			if (!! pageModules[pageId]) {
				require([pageModules[pageId]]);
				delete pageModules[pageId];
			}
		}
	});
});