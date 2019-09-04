import component from 'ComponentModule/cm';
const { cm } = component(__CURRENT_MODULE_PATH);
import LayoutComponent from 'raffy/LayoutComponent.jsx';
document.addEventListener('DOMContentLoaded', () => { 
	cm.jsxToDom.replaceWith(
		document.getElementById('placeholder-raffy-layout-component'), 
		(<LayoutComponent />)
	);
});  


      



