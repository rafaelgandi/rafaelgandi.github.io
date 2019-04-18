define(() => {
    const { cm, componentHtml } = (require('ComponentModule/cm'))('raffy/styles/raffy.css'); 
    const constants = require('raffy/constants');
    cm.componentStyle(componentHtml`<style>   
        html {
            /* See: https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away */
            touch-action: manipulation;
        }     
        html.desktop, .desktop body {
        	overflow: hidden;
        	width: 100%;
        }
        .left {float:left;}
        .right {float:right;}
        .clr {clear:both; font-size:0; }
        .redb {border: 1px solid red !important;}
        .hide {display: none;}
        .text-center {text-align: center;}
        body {
        	margin: 0;
        	padding: 0;
        	overflow-y: hidden;
        	font-size: 12px;	
        	font-family: ${ constants.css.fontFamily };
        	position: relative;
        	transition: opacity 0.5s ease-out;
        	opacity: 0;
        }
        body * {
        	box-sizing: border-box;	
        }
        
        a, a:link, a:active, a:visited { 
        	color:  ${ constants.css.linkNormalColor }; 
        	text-decoration: none;
        	transition: color 0.3s ease-out, opacity 0.3s ease-out;
        }
        a:hover { 
        	color: ${ constants.css.linkHighlightColor };
        }
        a:link { 
        	-webkit-tap-highlight-color: transparent; 
        }
        .raff-stop-body-scroll {
        	/* See: https://benfrain.com/preventing-body-scroll-for-modals-in-ios/ */
        	/* See: https://css-tricks.com/almanac/properties/t/touch-action/ */
        	overflow: hidden !important; 
        	touch-action: none;
        }
        .raff-stop-body-scroll .raffy-page-sections {
        	filter: blur(0.3em);
        }
        .raffy-show-page {
        	display: block !important;
        }
        .raffy-opacity-1 {
        	opacity: 1 !important;
        }
        #raffy-wrapper {
        	margin-top: 50px;
        	padding: 20px;
        	padding-top: 0;
        	position:relative;
        }
        #raffy-main-navigation {
        	position: relative;
        	display: block;
        	background-color:#fff;
        	z-index: 90;
        	margin: 0 auto;
        	width: 70%;
        }
        #raffy-profile-img, 
        #raffy-profile-img-mobile {
        	display: inline-block;
        	position: relative;    
            border: 0;
        	overflow: hidden;
        }
        #raffy-profile-img {
        	width: 120px;
            height: 120px;
        	border-radius: 76px;
        	margin-top: 20px;
            margin-left: 30px;
        }
        #raffy-profile-img img {
        	position: absolute;
            top: -19px;
            left: -10px;
            width: 150px;
            height: 150px;
        }
        #raffy-main-navigation nav {
        	float: right;
            margin-top: 70px;
        }
        
        #raffy-main-navigation ul {
        	padding: 0;
        }
        
        #raffy-main-navigation li {
        	font-size: 1.3em;
        	float: left;
        	margin-left: 25px;
        	text-transform: uppercase;
        }
        #raffy-main-navigation li a {
        	font-size: 0.8em;
        	color: #A9A9AE;
        }
        #raffy-main-navigation li a:hover,
        #raffy-main-navigation li a.raffy-active-page-link {
        	color: ${ constants.css.linkHighlightColor } !important;
        }
        section.raffy-page-sections {
        	font-size: 1.3em;
        	transition: opacity 0.3s ease-out;
        	opacity:0;
        	display: none;
        	padding-top: 50px;
        	padding-bottom: 100px;
        }
        
        section.raffy-page-sections p {
        	line-height: 1.7em;
        	display: block;
        	width: 60%;
        	margin: 0 auto;
        	margin-top: 1em;
        }
        .raffy-list-wrapper {
        	width: 70%; 
        	margin: 0 auto;
        	padding-bottom: 100px;
        }
        ul.raffy-list {
        	margin: 0;
        	padding: 0;
        	list-style: none;
        }
        ul.raffy-list li {
        	display: inline-block;
        	/* See: https://teamtreehouse.com/community/how-do-i-center-floated-list-items */
        	width: 14%;
        	height: 250px;   
            float: left;
            padding: 10px;
        	margin: 3%;    
        }
        ul.raffy-list .raffy-list-img-con {
        	width: 50%;
        	height: 150px;
        	overflow: hidden;
        	margin: 0 auto;	
        	display: table-cell;
            vertical-align: middle;
        }
        ul.raffy-list a.raffy-list-image-link {
        	border:0;
        }
        ul.raffy-list img {
        	display: block;
        	max-width: 100%;
            min-width: 100px;
        	max-height: 150px;
        	margin: 0 auto;
        	border:0;
        }
        ul.raffy-list div.raffy-list-desc {
        	font-size: 0.8em;
        	padding-top: 10px;
        	margin: 0 auto;
        	width: 90%;
        	text-align: center;
        }
        .raffy-text {
        	width: 90%;
            margin: 0 auto;
        }
        .raffy-text h1 {
        	margin-bottom: 10px;
            font-size: 1.1em;
            font-weight: normal;
            text-transform: uppercase;
        }
        
        #raffy-page-home {
        	font-size: 1.5em;
        	text-align: center;
        	line-height: 1.6em;
        }
        
        #raffy-email-container {
        	text-align: center;
        	width: 100%;
        	margin: 0 auto;
        	font-size: 5em;
        	margin-top: 96px;
        }
        #raffy-email-container a {
        	text-decoration: none;
        }
        #raffy-contact-links {
        	margin-top: 200px;
        	text-align: center;
        }
        #raffy-contact-links a {
        	font-size: 0.7em;
            text-transform: uppercase;
            display: inline-block;
            margin-right: 50px;
        }
    </style>`);
});