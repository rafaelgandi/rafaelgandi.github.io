define([
	'vendor/domReady!', 
	'util/helpers', 
	'raffy/globals',
	'raffy/buildMarkup',	
	'raffy/deferImages'
], function (domReady, helpers, globals, markup, undef) {
	var contactData = [
			{
				'link': 'https://www.facebook.com/rafaelgandi',
				'image_path': 'images/contacts/fb.png',
				'title': 'Be my friend :)',
				'text': 'Facebook'
			},
			{
				'link': 'http://ph.linkedin.com/pub/rafael-gandionco/45/a17/670',
				'image_path': 'images/contacts/linkedin.jpg',
				'title': 'Invite me at LinkedIn',
				'text': 'LinkedIn'
			}			
		],
		$contactPage = globals.$pages.contactPage;
	
	function decodeEmail() {
		// See: http://www.mailtoencoder.com/
		var email = ''
		var okvkpmp = ['a', 'a', '<', 'a', 'i', '.', ' ', 'i', '=', 'l', 'o', 'm', 'l', 'g', 'm', 'a', '"', 'c', 'a', 'e', 'c', 'm', 'a', 'f', 'r', 'a', 'r', 'f', 'l', '.', '@', 'r', 'a', 'a', '>', 's', 'm', 'g', '>', '=', 'l', 'i', 'c', 'n', 'a', '"', 'o', 'o', 'g', 'e', 'f', 'i', 'h', 'm', '@', 'l', 'i', '"', 'a', '"', 'n', 't', 'e', 'e', 's', 'a', 'a', ' ', 'd', 'l', 'g', 'i', 'l', 'd', '<', '/', 'm', ':'];
		var eqfpjxl = [19, 76, 74, 1, 31, 33, 38, 68, 7, 50, 14, 73, 32, 22, 29, 56, 37, 34, 17, 46, 39, 47, 10, 6, 4, 60, 16, 18, 12, 70, 27, 53, 54, 67, 77, 42, 9, 59, 52, 44, 40, 26, 71, 61, 48, 45, 72, 35, 65, 57, 55, 11, 3, 36, 64, 21, 63, 51, 30, 8, 24, 13, 20, 5, 43, 23, 41, 2, 25, 69, 28, 49, 58, 62, 0, 75, 66, 15];
		var rfggqzc = new Array();
		for (var i = 0; i < eqfpjxl.length; i++) {
			rfggqzc[eqfpjxl[i]] = okvkpmp[i];
		}
		for (var i = 0; i < rfggqzc.length; i++) {
			email +=rfggqzc[i];
		}
		return email;
	}	
	
	// Load and build the necessary markup (Runs only once)// 	
	if ($contactPage.hasClass(globals.PAGE_NO_CONTENTS_CLASS)) {
		markup.buildListMarkup({
			pageTemplatePath: 'templates/contact_page.html',
			$pageContainer: $contactPage,
			data: contactData,
			listTemplateId: 'contact_list_tpl',
			listContainerId: 'contact_link_list',
			afterBuild: function () {
				$('div.email_add').html(decodeEmail());
			}
		});		
	}	

});