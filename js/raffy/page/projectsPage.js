define([
	'vendor/domReady!', 
	'raffy/globals',
	'raffy/buildMarkup',
	'util/helpers',
	'raffy/deferImages'
], function (domReady, globals, markup, helpers, undef) {
	markup.loadTemplate('templates/projects_page.html', globals.$pages.projectsPage, function () {
		var html = '',
			oshtml = '',
			counter = 0,
			projetItemTpl = document.getElementById('project_item_tpl').innerHTML;
		
		var opensourcePorjectsData = [
			{
				"header" : "Wasabi Artisan",
				"link" : "https://github.com/rafaelgandi/wasabi_artisan",
				"image" : "wasabilogo.png"
			},
			{
				"header" : "RunWhen",
				"link" : "http://rafaelgandi.github.io/RunWhen",
				"image" : "runwhen.jpg"
			},
			{
				"header" : "Boot.js",
				"link" : "https://github.com/rafaelgandi/Bootjs",
				"image" : "bootjs.jpg"
			}
		];	
		// Open source projects //
		opensourcePorjectsData.forEach(function (proj) {		
			oshtml += helpers.tpl(projetItemTpl, proj);
		});
		$('#raffy_opensource_proj_con').html(oshtml);		
		// Websites I was a part of //
		$.getJSON('js/projects.json', function (projectData) {				
			html += '<div class="grid">';
			projectData.forEach(function (proj) {
				if (counter === 4) {
					counter = 0;
					html += '</div><div class="grid">';
				}
				html += helpers.tpl(projetItemTpl, proj);
				counter++;
			});	
			html += '</div>';		
			$('#raffy_projects_wrapper').html(html);
		});
	});
	
});