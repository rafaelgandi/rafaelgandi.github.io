define((require) => {    
    "use strict";
    const { cm, componentHtml, $, ixr, helpers } = (require('ComponentModule/cm'))(require('module').id); 
    class HeaderComponent extends cm.ComponentElement { 
        constructor(c) { 
            super(c);       
            this.state = {};
        }  
        render() {  
            return componentHtml`
            <header id="raffy-main-navigation-mobile">
    			<div>
    				<a href="#" id="raffy-mobile-menu-trigger">Menu</a>
    				<a href="/" id="raffy-profile-img-mobile">
                        <img src="images/profile_me.jpg">
                    </a>				
    			</div>			
    		</header>
    		<header id="raffy-main-navigation">
    			<a href="/" id="raffy-profile-img" title="@rafaelgandi">
                    <img src="images/profile_me.jpg" alt="rafael gadionco">
                </a>
    			<nav>
    				<ul>
    					<li><a href="/" rel="/" data-page-container-id="raffy-page-home">Me</a></li>
    					<li><a href="${ this.context.constants.uri.medium }" target="_blank">Blog</a></li>
    					<li><a href="${ this.context.constants.uri.googlePhotosPage }">Photography</a></li>
    					<li><a href="/projects" rel="/projects" data-page-container-id="raffy-page-projects">Web Developer Projects</a></li>
    					<li><a href="/contact" rel="/contact" data-page-container-id="raffy-page-contact">Contact</a></li>
    				</ul>
    				<div class="clr"></div>
    			</nav>
    			<div class="clr"></div>
    		</header>`;
        } 
        onAfterInitialRender() {    
            this.$mainNavigationHeader = this.$element.querySelector('#raffy-main-navigation');
        }   
        clearActiveLink() {
            this.$mainNavigationHeader.querySelectorAll('a[rel]').forEach(($a) => {
                $a.classList.remove('raffy-active-page-link');
            });
        }
        setLinkAsActive(_id) {
            this.clearActiveLink();        
            this.$mainNavigationHeader
            .querySelector(`a[data-page-container-id="${ _id }"]`)
            .classList
            .add('raffy-active-page-link');
        }
        events() {
            helpers
            .on(this.$element, 'click', '#raffy-mobile-menu-trigger', (e) => {
                e.preventDefault();
                this.$mainNavigationHeader.classList.toggle('raff-show-mobile-nav');
                return false;
            })
            .on(this.$element, 'click', '#raffy-main-navigation a[rel]', (e) => {
                this.$mainNavigationHeader.classList.remove('raff-show-mobile-nav');
            });
        }
    }      
    return cm.createComponent(HeaderComponent, 'div');
});