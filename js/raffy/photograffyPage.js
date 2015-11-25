define(['vendor/domReady!', 'util/helpers', 'raffy/globals'], function (domReady, helpers, globals) {
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
		listTemplate = document.getElementById('photograffy_list_tpl').innerHTML,
		html = '';
		
	photographyData.forEach(function (data) {
		html += helpers.tpl(listTemplate, data);
	});
	
	document.getElementById('photograffy_link_list').innerHTML = html;
});