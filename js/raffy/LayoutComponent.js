"use component";
const { cm, componentHtml, $, ixr, helpers, typeOf } = component('raffy/LayoutComponent', 'div'); 
const cssLoaded = cm.componentStyleFrom('/js/raffy/styles/raffy.css');                     

import HeaderComponent from 'raffy/HeaderComponent';  
import ListComponent from 'raffy/ListComponent';  
import EmailLinkComponent from 'raffy/EmailLinkComponent';
import ContactLinksComponent from 'raffy/ContactLinksComponent';  
import simpleRouter from 'raffy/simpleRouter';
import projectItems from 'raffy/projects';
import openSourceProjects from 'raffy/openSourceProjects';
import weapons from 'raffy/weapons';
import constants from 'raffy/constants'; 

class LayoutComponent extends cm.ComponentElement { 
    constructor(c) { 
        super(c);       
        this.state = {
            uriIdChange: null
        };
        this.currentUri = (parent !== window) ? document.referrer : document.location; // See: http://stackoverflow.com/a/7739035
        this.$body = document.getElementsByTagName('body')[0];
        this.setContextData({
            constants: constants
        });
    }  
    render() {  
        return componentHtml`
		<HeaderComponent onMainMenuTrigger="${ this.onMainMenuTrigger.bind(this) }"></HeaderComponent>            
        <section id="raffy-page-home" class="raffy-page-sections">
			<p style="margin-top: 2.6em;">
				Hi, my name's Rafael Gandionco and I'm a minimalist, photographer, and web developer from the Philippines.
            </p>
            <p>    
                Both photography and web development are an ongoing passion of mine. For me, one complements the other. One 
                enables me to express how I see the world around me in a more organic and abstract way, while the other helps 
                me express my creativity in building software.   	
            </p> 
            <p>   
                While pursuing these passions I discovered minimalism. Minimalism has brought back clarity in my life. It taught 
                me the value of having more with less. It has redefined what success means to me. I'm currently in the process of 
                applying it on every facet of my life.
            </p>
            <p>				
                Through my photography and web development with the help of the values I learned from minimalism, I hope to help 
                people discover the beauty in the ordinary things and situations we find in our everyday lives.
            </p>  
		</section>
		<section id="raffy-page-projects" class="raffy-page-sections">
            <div class="raffy-text  text-center" style="margin-top: 80px;"><h1>Tools I use for web development.</h1></div>      
			<ListComponent items="${ weapons }"></ListComponent>
			<div class="raffy-text text-center"><h1>Some of my personal open source projects on <a href="${ this.context.constants.uri.github }" target="_blank">github.</a></h1></div>
            <ListComponent items="${ openSourceProjects }"></ListComponent>
			<div class="raffy-text  text-center"><h1>A few client projects I was a part of building.</h1></div>            
			<ListComponent items="${ projectItems }"></ListComponent>
		</section>
		<section id="raffy-page-contact" class="raffy-page-sections">
			<EmailLinkComponent></EmailLinkComponent>
			<ContactLinksComponent></ContactLinksComponent>
		</section>`;
    } 
    onAfterInitialRender() { 
        // Breakout of frame if in mobile and in frameset (.tk) //   
        if (this._isInsideFrame() && this._isMobile()) {
            window.top.location.href = this.context.constants.uri.myGithubPageUri;
        }   
        this.$element.id = 'raffy-wrapper';
        this.$HeaderComponent = HeaderComponent.renderAllComponents(this.$element);
        ListComponent.renderAllComponents(this.$element);
        EmailLinkComponent.renderAllComponents(this.$element);
        ContactLinksComponent.renderAllComponents(this.$element);
        this.$pagesContainers = this.$element.querySelectorAll('.raffy-page-sections'); 
        cssLoaded.then(() => {
            this.$body.classList.add('raffy-opacity-1');    
        });                          
    }
    onStateChange(_stateName) {
        if (this.isIn('uriIdChange', _stateName)) {
            this._hideAllPages();
            let $pageCon = document.getElementById(this.state.uriIdChange);
            $pageCon.classList.add('raffy-show-page');
            setTimeout(() => {
                $pageCon.classList.add('raffy-opacity-1');
            }, 50);
            this.$HeaderComponent.cm.setLinkAsActive(this.state.uriIdChange);
        }
    }    
    _hideAllPages() {
        this.$pagesContainers.forEach(function (elem) {
            elem.classList.remove('raffy-show-page', 'raffy-opacity-1');
        });
        this.$body.scrollTop = 0;
    }  
    _isInsideFrame() {
        // See: http://stackoverflow.com/a/326076
        try { return window.self !== window.top; } 
        catch (e) { return true; }
    }
    _isMobile() {
        // See: http://stackoverflow.com/a/14301832
        return typeof window.orientation !== 'undefined';
    } 
    _setInitialPage() {
        if (typeOf(this.currentUri) === 'string') {
            if (this.currentUri.indexOf(this.context.constants.routes.projects) !== -1) {
                simpleRouter.navigate(this.context.constants.routes.projects); 
                return;
            }
            else if (this.currentUri.indexOf(this.context.constants.routes.contact) !== -1) {
                simpleRouter.navigate(this.context.constants.routes.contact); 
                return;
            }
            else if (this.currentUri.indexOf(this.context.constants.routes.blog) !== -1) {
                window.top.location.href = this.context.constants.uri.medium;
                return;
            }
            else if (this.currentUri.indexOf(this.context.constants.routes.photography) !== -1) {
                window.top.location.href = this.context.constants.uri.googlePhotosPage;
                return;
            }
            else {
                simpleRouter.navigate(this.context.constants.routes.home); 
                return;
            }
        }        
        simpleRouter.navigate(window.location.pathname); 
    }
    onMainMenuTrigger(_$mainNavigationElement) {
        simpleRouter.navigate(_$mainNavigationElement.rel); 
    }
    events() {
        simpleRouter
        .route(this.context.constants.routes.home, (_data) => this.setState('uriIdChange', 'raffy-page-home'))
        .route(this.context.constants.routes.projects, (_data) => this.setState('uriIdChange', 'raffy-page-projects'))
        .route(this.context.constants.routes.contact, (_data) => this.setState('uriIdChange', 'raffy-page-contact'));
        this._setInitialPage();
    }
}