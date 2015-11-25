define(['vendor/domReady!', 'util/helpers', 'raffy/globals', 'raffy/deferImages'], function (domReady, helpers, globals, undefined) {
	var weaponsData = [
			{
				'link': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
				'image_path': 'images/weapons/javascript.jpg',
				'title': 'Javascript',
				'text': 'Javascript'
			},
			{
				'link': 'http://jquery.com',
				'image_path': 'images/weapons/jquery.png',
				'title': 'jQuery',
				'text': 'jQuery'
			},
			{
				'link': 'http://laravel.com/',
				'image_path': 'images/weapons/laravel.png',
				'title': 'Laravel PHP Framework',
				'text': 'Laravel PHP Framework'
			},
			{
				'link': 'http://codeigniter.com/',
				'image_path': 'images/weapons/ci.jpg',
				'title': 'Codeigniter PHP Framework',
				'text': 'Codeigniter PHP Framework'
			},
			{
				'link': 'http://www.mysql.com/',
				'image_path': 'images/weapons/mysql.jpg',
				'title': 'MySQL Relational Database',
				'text': 'MySQL Relational Database'
			},
			{
				'link': 'http://www.w3.org/html/logo/',
				'image_path': 'images/weapons/html5.png',
				'title': 'HTML5',
				'text': 'HTML5'
			}
		],
		listTemplate = document.getElementById('weapons_list_tpl').innerHTML,
		html = '';
		
	weaponsData.forEach(function (data) {
		html += helpers.tpl(listTemplate, data);
	});
	
	document.getElementById('weapons_link_list').innerHTML = html;
});