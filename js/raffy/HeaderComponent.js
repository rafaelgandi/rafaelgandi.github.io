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
    				<a href="${ this.context.constants.routes.home }" id="raffy-profile-img-mobile">
                        <!-- See: https://www.html5rocks.com/en/tutorials/responsive/picture-element/ -->
                        <picture>
                            <source type="image/webp" srcset="images/profile3_comp.webp">
                            <source type="image/jpeg" srcset="images/profile3_comp_moz.jpg">
                            <img src="images/profile3_comp.jpg" alt="rafael gadionco">
                        </picture>
                    </a>				
    			</div>			
    		</header>
    		<header id="raffy-main-navigation">
    			<a href="${ this.context.constants.routes.home }" id="raffy-profile-img" title="@rafaelgandi">
                    <picture>
                        <source type="image/webp" srcset="images/profile3_comp.webp">
                        <source type="image/jpeg" srcset="images/profile3_comp_moz.jpg">
                        <img src="images/profile3_comp.jpg" alt="rafael gadionco">
                    </picture>
                </a>
    			<nav>
    				<ul>
    					<li><a href="${ this.context.constants.routes.home }" rel="${ this.context.constants.routes.home }" data-page-container-id="raffy-page-home">Me</a></li>
    					<li><a href="${ this.context.constants.uri.medium }" target="_top">Blog</a></li>
    					<li><a href="${ this.context.constants.uri.googlePhotosPage }" target="_top">Photography</a></li>
    					<li><a href="${ this.context.constants.routes.projects }" rel="${ this.context.constants.routes.projects }" data-page-container-id="raffy-page-projects">Web Development</a></li>
    					<li><a href="${ this.context.constants.routes.contact }" rel="${ this.context.constants.routes.contact }" data-page-container-id="raffy-page-contact">Contact</a></li>
    				</ul>
    				<div class="clr"></div>
    			</nav>
    			<div class="clr"></div>
    		</header>`;
        } 
        onAfterInitialRender() {    
            this.$mainNavigationHeader = this.$element.querySelector('#raffy-main-navigation');
            this.$body = document.getElementsByTagName('body')[0];
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
                this.$body.classList.toggle('raff-stop-body-scroll');
                return false;
            })
            .on(this.$element, 'click', '#raffy-main-navigation a[rel]', (e) => {
                this.$mainNavigationHeader.classList.remove('raff-show-mobile-nav');
                this.$body.classList.remove('raff-stop-body-scroll');
            });
        }
    }      
    return cm.createComponent(HeaderComponent, 'div');
});