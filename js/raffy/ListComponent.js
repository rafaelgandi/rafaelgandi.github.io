define((require) => {    
    "use strict";
    const { cm, componentHtml, $, ixr, helpers, typeOf } = (require('ComponentModule/cm'))(require('module').id); 
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
                        <Component-x 
                        type="raffy/ImageLoadingComponent" 
                        containerClass="raffy-list-img-con" 
                        src="${ item.image }"></Component-x>
                        
                        <div class="raffy-list-desc">
                            ${ (typeOf(item.desc) === 'undefined') ? item.header : item.desc }
                        </div>
                    </a>
                </li>
            `).join('') }                    
            </ul>
            <div class="clr"></div>`;
        }
        onAfterInitialRender() {    
            this.$element.classList.add('raffy-list-wrapper');
            ImageLoadingComponent.renderAllComponents(this.$element);
        }   
    }      
    return cm.createComponent(ListComponent, 'div');
});