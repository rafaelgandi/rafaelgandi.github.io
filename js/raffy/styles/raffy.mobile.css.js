define(() => {
    const { cm, componentHtml } = (require('ComponentModule/cm'))('raffy/styles/raffy.mobile.css'); 
    const constants = require('raffy/constants');
    cm.componentStyle(componentHtml`<style>        
    #raffy-main-navigation-mobile {
    	position: fixed;
    	top: 0;
    	left: 0;
    	right: 0;
    	z-index: 100;
    	background-color: #fff;
    	display: none;
    	box-shadow: 0px 6px 17px -8px rgba(0,0,0,0.95);
    }
    #raffy-main-navigation-mobile > div {
    	position: relative;
        padding: 10px;
        min-height: 90px;
    }
    #raffy-mobile-menu-trigger, #raffy-profile-img-mobile {
    	position: absolute;
    	display: inline-block;
    	padding: 10px;
    	top: 5px;
    }
    #raffy-mobile-menu-trigger {
    	left: 15px;
        font-size: 1.8em;
        top: 25px;
        display: inline-block;
        transition: transform 0.5s ease-out;
    }
    /* See: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js */
    #raffy-mobile-menu-trigger .burger-menu-bars {
    	width: 35px;
    	height: 3px;
    	background-color: ${ constants.css.linkHighlightColor };
    	margin: 6px 0;
    	transition: 0.4s;
    	pointer-events: none;
    }
    #raffy-mobile-menu-trigger.burger-menu-bars-close {
    	transform: rotate(360deg);
    }
    .burger-menu-bars-close .bar1 {
    	transform: rotate(-45deg) translate(-9px, 6px);
    }
    .burger-menu-bars-close .bar2 {
    	opacity: 0;
    }
    .burger-menu-bars-close .bar3 {
    	transform: rotate(45deg) translate(-7px, -4px);
    }
    
    #raffy-profile-img-mobile {
    	right: 10px;
        width: 70px;
        height: 70px;
        border-radius: 40px;
        margin-top: 6px;
        margin-right: 10px;
    }
    #raffy-profile-img-mobile img {
    	position: absolute;
        top: -11px;
        left: -12px;
        width: 100px;
        height: 100px;
    }
    
    /*@media screen and (max-width: 568px) {*/
    @media screen and (max-width: 800px) {
    	#raffy-wrapper {
    		margin-top: 50px;
    		padding: 20px;
    		padding-top: 0;
    	}
    	#raffy-main-navigation-mobile { 
    		display: block;
    	}
    	#raffy-main-navigation {
    		position: fixed;
    		top: 0;
    		bottom: 0;
    		display: block;
    		padding-left: 30px;
    		padding-right: 30px;
    		padding-top: 30px;
    		transform: translateX(-350px);
    		transition: transform 0.3s ease-out;
    		box-shadow: 10px 2px 33px -11px rgba(0,0,0,0.46);
            will-change: transform;
    	}
    	#raffy-main-navigation.raff-show-mobile-nav {
    		transform: translateX(-50px);
    	}
    	#raffy-main-navigation #raffy-profile-img {
    		display: none;
    	}
    
    	#raffy-main-navigation nav {
    		float: none;
    		display: block;
    		margin-top: 80px;;
    	}
    
    	#raffy-main-navigation ul {
    		padding: 0;
    	}
    
    	#raffy-main-navigation li {
    		font-size: 1.3em;
    		float: none;
    		display: block;
    		margin-left: 0;
    		border-top: 1px solid #ccc;
    	}
    	#raffy-main-navigation li a {
    		display: block;
    		width: 100%;
    		padding: 20px;
    	}
    	section.raffy-page-sections {
    		padding-top: 50px;
    	}
    	section.raffy-page-sections p {
    		width: 80%;
    	}
    	ul.raffy-list li {
    		width: 99%;	
    	}
    	#raffy-page-home {
    		font-size: 1.2em;
    	}
    	#raffy-email-container {
    		font-size: 1.2em;
    		margin-top: 168px;
    	}
    	#raffy-email-container a {
    		display: block;
    		width: 100%;
    		margin: 0 auto;
    		padding: 10px;
    	}
    	#raffy-contact-links {
    		margin-top: 160;
    	}
    	#raffy-contact-links a {
    		font-size: 0.9em;
    	    padding: 10px;
    	    margin-right: 0;
    	}
    }
    </style>`);
});