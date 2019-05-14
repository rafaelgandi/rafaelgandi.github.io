"use component";
const { cm, componentHtml, $, ixr, helpers, typeOf } = component('raffy/ListComponent', 'div'); 
const ImageLoadingComponent = require('raffy/ImageLoadingComponent');
class ListComponent extends cm.ComponentElement { 
    constructor(c) { 
        super(c);       
        this.state = {};
    }  
    render() {  
        return componentHtml`
        <ul class="raffy-list">
        ${ this.props.items.map((item) => componentHtml`
            <li>
                <a href="${ item.link }" class="raffy-list-image-link" target="_blank">
                    <ImageLoadingComponent 
                    containerClass="raffy-list-img-con" 
                    src="${ item.image }"></ImageLoadingComponent>
                    
                    <div class="raffy-list-desc">
                        ${ (typeOf(item.desc) === 'undefined') ? item.header : item.desc }
                    </div>
                </a>
            </li>
        `).join('') }                    
        </ul>
        <div class="clr"></div>`;
    }
    propTypes() {
        return {
            items: 'array'
        };
    }
    onAfterInitialRender() {    
        this.$element.classList.add('raffy-list-wrapper');
        ImageLoadingComponent.renderAllComponents(this.$element);
    }   
}      
