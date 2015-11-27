define([
	'vendor/domReady!', 
	'raffy/globals',
	'raffy/buildMarkup',
	'raffy/deferImages'
], function (domReady, globals, markup, undefined) {
	var photographyData = [
			{
				'link': 'http://www.flickr.com/rafaelgandi/',
				'image_path': 'images/photography/flickr.png',
				'title': 'Check out some of my photos on flickr',
				'text': 'Flickr'
			},
			{
				'link': 'http://500px.com/rafaelgandi/',
				'image_path': 'images/photography/500px2.png',
				'title': 'Check out photos from my 500px account',
				'text': '500px'
			},
			{
				'link': 'http://www.instagram.com/rafaelgandi/',
				'image_path': 'images/photography/instagram.png',
				'title': 'Check out photos from my instagram',
				'text': 'Instagram'
			}
		],
		$photograffyPage = globals.$pages.photograffyPage;
		
	// Load and build the necessary markup (Runs only once)// 	
	if ($photograffyPage.hasClass(globals.PAGE_NO_CONTENTS_CLASS)) {
		markup.buildListMarkup({
			pageTemplatePath: 'templates/photograffy_page.html',
			$pageContainer: $photograffyPage,
			data: photographyData,
			listTemplateId: 'photograffy_list_tpl',
			listContainerId: 'photograffy_link_list'
		});
	}		
});