define(['vendor/domReady!', 'util/helpers', 'raffy/globals', 'raffy/deferImages'], function (domReady, helpers, globals, undefined) {
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
		listTemplate = '',
		html = '',
		$photograffyPage = globals.$pages.photograffyPage;
	// Load and build the necessary markup (Runs only once)// 	
	if ($photograffyPage.hasClass(globals.PAGE_NO_CONTENTS_CLASS)) {
		$.get('templates/photograffy_page.html', function (res) {
			$photograffyPage
			.html(res)
			.removeClass(globals.PAGE_NO_CONTENTS_CLASS);
			// Build the the list here //
			listTemplate = document.getElementById('photograffy_list_tpl').innerHTML;
			photographyData.forEach(function (data) {
				html += helpers.tpl(listTemplate, data);
			});	
			document.getElementById('photograffy_link_list').innerHTML = html;
		});
	}	
});