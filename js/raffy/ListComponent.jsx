import component from 'ComponentModule/cm';
const { cm, typeOf } = component(__CURRENT_MODULE_PATH); 
import ImageLoadingComponent from 'raffy/ImageLoadingComponent.jsx';
export default class ListComponent extends cm.ComponentElement { 
    constructor() { 
        super();       
        this.state = {};
    }  
    render() {  
        return (
            <div data-component-type={__CURRENT_MODULE_PATH} className="raffy-list-wrapper">
                <ul class="raffy-list">
                { this.props.items.map((item) => {
                    let desc = null;
                    if (typeOf(item.desc) !== 'undefined') {
                        let temp = document.createElement('div');
                        temp.innerHTML = item.desc;
                        desc = temp.childNodes;
                    }
                    else {
                        desc = item.header;
                    }
                    return (
                        <li>
                            <a href={ item.link } class="raffy-list-image-link" target="_blank">
                                <ImageLoadingComponent 
                                    containerClass="raffy-list-img-con" 
                                    src={ item.image } 
                                />                        
                                <div class="raffy-list-desc">
                                    { desc }
                                </div>
                            </a>
                        </li>
                    );
                }) }                    
                </ul>
                <div class="clr"></div>
            </div>
        );
    }
    propTypes() {
        return {
            items: 'array'
        };
    }
    onAfterInitialRender() {    
        
    }   
}      
