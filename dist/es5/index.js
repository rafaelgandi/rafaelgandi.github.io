;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(arr,i){if(!(Symbol.iterator in Object(arr)||Object.prototype.toString.call(arr)==="[object Arguments]")){return}var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}System.register(["/src/third-party/bootstrap/js/react-bootstrap.min.js","/src/third-party/react/prop-types.development.js"],function(){"use strict";var ReactBootstrap,PropTypes;return{setters:[function(module){ReactBootstrap=module["default"]},function(module){PropTypes=module["default"]}],execute:function execute(){var useState=window.React.useState,useEffect=window.React.useEffect,useRef=(window.React.useContext,window.React.useReducer,window.React.useCallback,window.React.useMemo,window.React.useRef);window.React.useImperativeHandle,window.React.useLayoutEffect,window.React.useDebugValue,window.React.Component,window.React.Suspense;var React$1=window.React,ReactDOM=window.ReactDOM,css_pages_wrapper="index_cholob8679ac4daf1648bc97eb3a75bc69615_nk8__pages-wrapper__8ie";ReactBootstrap.AbstractNav,ReactBootstrap.AbstractNavItem,ReactBootstrap.Accordion,ReactBootstrap.AccordionCollapse,ReactBootstrap.AccordionContext,ReactBootstrap.AccordionToggle,ReactBootstrap.Alert,ReactBootstrap.Badge,ReactBootstrap.BootstrapModalManager,ReactBootstrap.Breadcrumb,ReactBootstrap.BreadcrumbItem,ReactBootstrap.Button,ReactBootstrap.ButtonGroup,ReactBootstrap.ButtonToolbar,ReactBootstrap.Card,ReactBootstrap.CardColumns,ReactBootstrap.CardContext,ReactBootstrap.CardDeck,ReactBootstrap.CardGroup,ReactBootstrap.CardImg,ReactBootstrap.Carousel,ReactBootstrap.CarouselCaption,ReactBootstrap.CarouselItem,ReactBootstrap.CloseButton;var Col=ReactBootstrap.Col,Container=(ReactBootstrap.Collapse,ReactBootstrap.Container),Nav=(ReactBootstrap.Dropdown,ReactBootstrap.DropdownButton,ReactBootstrap.DropdownItem,ReactBootstrap.DropdownMenu,ReactBootstrap.DropdownToggle,ReactBootstrap.ElementChildren,ReactBootstrap.Fade,ReactBootstrap.Feedback,ReactBootstrap.Figure,ReactBootstrap.FigureCaption,ReactBootstrap.FigureImage,ReactBootstrap.Form,ReactBootstrap.FormCheck,ReactBootstrap.FormCheckInput,ReactBootstrap.FormCheckLabel,ReactBootstrap.FormContext,ReactBootstrap.FormControl,ReactBootstrap.FormGroup,ReactBootstrap.FormLabel,ReactBootstrap.FormText,ReactBootstrap.Image,ReactBootstrap.InputGroup,ReactBootstrap.Jumbotron,ReactBootstrap.ListGroup,ReactBootstrap.ListGroupItem,ReactBootstrap.Media,ReactBootstrap.Modal,ReactBootstrap.ModalBody,ReactBootstrap.ModalContext,ReactBootstrap.ModalDialog,ReactBootstrap.ModalFooter,ReactBootstrap.ModalHeader,ReactBootstrap.ModalTitle,ReactBootstrap.Nav),Navbar=(ReactBootstrap.NavContext,ReactBootstrap.NavDropdown,ReactBootstrap.NavItem,ReactBootstrap.NavLink,ReactBootstrap.Navbar),Row=(ReactBootstrap.NavbarBrand,ReactBootstrap.NavbarCollapse,ReactBootstrap.NavbarContext,ReactBootstrap.NavbarToggle,ReactBootstrap.Overlay,ReactBootstrap.OverlayTrigger,ReactBootstrap.PageItem,ReactBootstrap.Pagination,ReactBootstrap.Popover,ReactBootstrap.PopoverContent,ReactBootstrap.PopoverTitle,ReactBootstrap.ProgressBar,ReactBootstrap.ResponsiveEmbed,ReactBootstrap.Row);ReactBootstrap.SafeAnchor,ReactBootstrap.SelectableContext,ReactBootstrap.Spinner,ReactBootstrap.SplitButton,ReactBootstrap.Switch,ReactBootstrap.Tab,ReactBootstrap.TabContainer,ReactBootstrap.TabContent,ReactBootstrap.TabContext,ReactBootstrap.TabPane,ReactBootstrap.Table,ReactBootstrap.Tabs,ReactBootstrap.ThemeProvider,ReactBootstrap.Toast,ReactBootstrap.ToastBody,ReactBootstrap.ToastContext,ReactBootstrap.ToastHeader,ReactBootstrap.ToggleButton,ReactBootstrap.ToggleButtonGroup,ReactBootstrap.Tooltip;var css$1_profile_pic="Header_cholo2e64ec1b2897cdb887770a9d6ad8bea5_nk8__profile-pic__8ie",css$1_initial_profile_pic="Header_cholo2e64ec1b2897cdb887770a9d6ad8bea5_nk8__initial-profile-pic__8ie",css$1_responsive_navbar_nav="Header_cholo2e64ec1b2897cdb887770a9d6ad8bea5_nk8__responsive-navbar-nav__8ie";function Header(props){var intialProfPicImgBase64Str="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wEEEAAsACwALAAsAC8ALAAyADcANwAyAEUASwBCAEsARQBmAF4AVgBWAF4AZgCbAG8AdwBvAHcAbwCbAOsAkwCsAJMAkwCsAJMA6wDQAPwAzQC/AM0A/ADQAXYBJgEEAQQBJgF2AbABawFXAWsBsAIMAdQB1AIMApMCcgKTA10DXQSGEQAsACwALAAsAC8ALAAyADcANwAyAEUASwBCAEsARQBmAF4AVgBWAF4AZgCbAG8AdwBvAHcAbwCbAOsAkwCsAJMAkwCsAJMA6wDQAPwAzQC/AM0A/ADQAXYBJgEEAQQBJgF2AbABawFXAWsBsAIMAdQB1AIMApMCcgKTA10DXQSG/8IAEQgAZABkAwEiAAIRAQMRAf/EABkAAAMBAQEAAAAAAAAAAAAAAAABAwIEBf/aAAgBAQAAAAD1ASWQYFUCWQYFBHDO3QwChk8rqV9gPZLEK46GDNkpONK6AKEpTxcVhlFx8CL38/u7ArDzE8w9E5fU0W4OHbI7780oW8uCqlDs6Xt285clc6zz+hfbt50pbY+fqvY//8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/9oACAECEAAAAABm0MXQZmxEm7IY1vMpN//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/2gAIAQMQAAAAhKHXOBOzkHS84bXXFdx0xz1vJef/xAAqEAEAAgIABAQHAAMAAAAAAAABAAIDERASITEEIDAyIjNBQlFhcVKBwf/aAAgBAQABPwDzPqvp+J8U0tyU98sUt71szHy0Pc8r+X0Vm4418Ta30bQp+FIVERT+MpvXoWm5YC+t/uD0js7O2V7HoW4ZKjTf1JRe0aVuah39C0UOq6I56X3Ss3y2gy1ylWzDxOF+6bE2eVdTNn5egS7az1dwI3v/AJTBmX4bd5lq2xdOsRHSaZ4fJ9j5c1tEtbb/ALmuCR2TBZcVTmmfG3ruvcmNdjK25gfJ4i22W2SrsODLV6EwX5L8r2YMcdNtuUlNHQ4vQmV3eXTTMb8B/OF+0ToEyEw5eev7IM/ZxZk+ZM9imOY/bWbj1SMsbGVs477mO5aHF7Mt8yeK9tZT/kJ9TgTIG5UDBRlF0cf/xAAcEQEBAAICAwAAAAAAAAAAAAABABAgAjERITD/2gAIAQIBAT8A+Kxs+mNkW8bsMYYctxw9Rl6bjj//xAAfEQACAgEFAQEAAAAAAAAAAAAAAQIREAMgITFBMDL/2gAIAQMBAT8A+MUTW6LtE+dtEWki+Brcuxxsap4XaGqynZqeYj+kS7z6jUx//9k=",_useState=useState({webp:intialProfPicImgBase64Str,moz:intialProfPicImgBase64Str,fallback:intialProfPicImgBase64Str,initialProfPicClass:css$1_initial_profile_pic}),_useState2=_slicedToArray(_useState,2),profPicData=_useState2[0],setProfPicData=_useState2[1],links=[{link:"/",linkLabel:"Me"},{link:"https://medium.com/rafael-gandionco",linkLabel:"Blog",external:!0},{link:"http://tinyurl.com/RafaelGandioncoPhotography",linkLabel:"Photography",external:!0},{link:"/web-development",linkLabel:"Web Development"},{link:"/contact",linkLabel:"Contact"}];function handleNavigateClick(e){e.preventDefault();var id=e.currentTarget.rel,isExternal=!!parseInt(e.currentTarget.getAttribute("data-is-external"),10);props.onNavigate(id,isExternal)}return useEffect(function(){!function(){var i=new Image;i.src="images/profile3_comp.webp",i.onload=function(){setProfPicData({webp:"images/profile3_comp.webp",moz:"images/profile3_comp_moz.jpg",fallback:"images/profile3_comp.jpg",initialProfPicClass:""})}}()},[]),React.createElement(Navbar,{collapseOnSelect:!0,expand:"lg",bg:"raffy-navbar",fixed:"top"},React.createElement(Navbar.Brand,{href:links[0].link,className:css$1_profile_pic},React.createElement("picture",{className:profPicData.initialProfPicClass,title:"Hi!"},React.createElement("source",{type:"image/webp",srcSet:profPicData.webp}),React.createElement("source",{type:"image/jpeg",srcSet:profPicData.moz}),React.createElement("img",{src:profPicData.fallback,alt:"rafael gadionco"}))),React.createElement(Navbar.Toggle,{"aria-controls":css$1_responsive_navbar_nav}),React.createElement(Navbar.Collapse,{id:css$1_responsive_navbar_nav,className:"justify-content-end"},React.createElement(Nav,{defaultActiveKey:props.defaultActiveKey?props.defaultActiveKey:"/"},links.map(function(_ref){var link=_ref.link,linkLabel=_ref.linkLabel,external=_ref.external;return React.createElement(Nav.Item,{key:link},React.createElement(Nav.Link,{rel:link,href:link,"data-is-external":external?1:0,onClick:handleNavigateClick,eventKey:link},linkLabel))}))))}Header.propTypes={onNavigate:PropTypes.func.isRequired,defaultActiveKey:PropTypes.string};var css$2_page_sections="PageSection_cholo5a3a98e9f13a4f1f3e60a2da32da0876_nk8__page-sections__8ie",css$2_show="PageSection_cholo5a3a98e9f13a4f1f3e60a2da32da0876_nk8__show__8ie";function PageSection(props){return React$1.createElement("section",{id:props.id,className:"".concat(css$2_page_sections," ").concat(props.show?css$2_show:"")},props.children)}PageSection.propTypes={id:PropTypes.string.isRequired,show:PropTypes.bool.isRequired};var css$3_bigger_text="HomePage_cholo629ae4011f036fab4efbf3070f9282ce_nk8__bigger-text__8ie";function HomePage(){return React$1.createElement("p",{id:css$3_bigger_text,style:{marginTop:"2.6em"},className:"text-center"},"Hi, my name's Rafael Gandionco and I'm a minimalist, web developer, and photographer from the Philippines.")}var css$4_contact_links="ContactPage_choloce82197443190596532790efc0a0a67e_nk8__contact-links__8ie",css$5_email_container="EmailLink_cholod03203027963d66c539fab94c4078d54_nk8__email-container__8ie";function EmailLink(){return useEffect(function(){var $temp=document.createElement("div");$temp.innerHTML=function(){var email="",okvkpmp=["a","a","<","a","i","."," ","i","=","l","o","m","l","g","m","a","\"","c","a","e","c","m","a","f","r","a","r","f","l",".","@","r","a","a",">","s","m","g",">","=","l","i","c","n","a","\"","o","o","g","e","f","i","h","m","@","l","i","\"","a","\"","n","t","e","e","s","a","a"," ","d","l","g","i","l","d","<","/","m",":"],eqfpjxl=[19,76,74,1,31,33,38,68,7,50,14,73,32,22,29,56,37,34,17,46,39,47,10,6,4,60,16,18,12,70,27,53,54,67,77,42,9,59,52,44,40,26,71,61,48,45,72,35,65,57,55,11,3,36,64,21,63,51,30,8,24,13,20,5,43,23,41,2,25,69,28,49,58,62,0,75,66,15],rfggqzc=new Array;for(var i=0;i<eqfpjxl.length;i++){rfggqzc[eqfpjxl[i]]=okvkpmp[i]}for(var _i2=0;_i2<rfggqzc.length;_i2++){email+=rfggqzc[_i2]}return email}(),document.getElementById(css$5_email_container).appendChild($temp.children[0])},[]),React.createElement("div",{id:css$5_email_container})}var constants={uri:{instagram:"https://www.instagram.com/rafaelgandi/",facebook:"https://www.facebook.com/rafaelgandi",linkedin:"https://ph.linkedin.com/in/rafael-gandionco-670a1745",zerothreetwo:"http://zerothreetwo.com/author/rafaelgandi/",medium:"https://medium.com/rafael-gandionco",flickr:"https://www.flickr.com/photos/rafaelgandi/",fiveHundredPx:"https://500px.com/rafaelgandi",eyeem:"https://www.eyeem.com/u/rafaelgandi",github:"https://github.com/rafaelgandi",myGithubPageUri:"http://rafaelgandi.github.com",googlePhotosPage:"http://tinyurl.com/RafaelGandioncoPhotography"},routes:{home:"/",blog:"/blog",photography:"/photography",webDevelopment:"/web-development",contact:"/contact"}},contactLabels=[{href:"instagram",title:"Go to my instagram page",label:"Instagram"},{href:"facebook",title:"Add me on facebook",label:"Facebook"},{href:"linkedin",title:"View my linkedin profile",label:"LinkedIn"},{href:"zerothreetwo",title:"Read a photo essay I did for Zerothreetwo.com",label:"032"},{href:"medium",title:"Check out my blog a medium",label:"Medium"},{href:"flickr",title:"View my flickr profile",label:"Flickr"},{href:"fiveHundredPx",title:"View my 500px profile",label:"500px"},{href:"eyeem",title:"View my EyeEm profile",label:"EyeEm"},{href:"github",title:"Checkout my open source projects at github.com",label:"Github"}];function ContactPage(){return React$1.createElement(React$1.Fragment,null,React$1.createElement(EmailLink,null),React$1.createElement("div",{className:css$4_contact_links},contactLabels.map(function(contact){return React$1.createElement("a",{href:constants.uri[contact.href],target:"_blank",rel:"noreferrer",title:contact.title,key:contact.href},contact.label)})))}var css$6_web_dev_h1="WebDevPage_cholo47c7a6b278094381145f038198d46262_nk8__web-dev-h1__8ie",css$7_grid_container="GridList_cholo7609e136b7d4ac04235f34562afacf58_nk8__grid-container__8ie",css$7_grid_item="GridList_cholo7609e136b7d4ac04235f34562afacf58_nk8__grid-item__8ie",css$7_img_con="GridList_cholo7609e136b7d4ac04235f34562afacf58_nk8__img-con__8ie",css$7_desc="GridList_cholo7609e136b7d4ac04235f34562afacf58_nk8__desc__8ie",css$8_pulsate="LazyImg_cholo0e4e47b253fbca773982babc2470882d_nk8__pulsate__8ie",css$8_hide="LazyImg_cholo0e4e47b253fbca773982babc2470882d_nk8__hide__8ie",css$8_img_container="LazyImg_cholo0e4e47b253fbca773982babc2470882d_nk8__img-container__8ie";function LazyImg(props){var imgRef=useRef(),_useState3=useState(""),_useState4=_slicedToArray(_useState3,2),imgSrc=_useState4[0],setImgSrc=_useState4[1],_useState5=useState(!1),_useState6=_slicedToArray(_useState5,2),showImg=_useState6[0],setShowImg=_useState6[1],_useState7=useState(!0),_useState8=_slicedToArray(_useState7,2),showPulsate=_useState8[0],setShowPulsate=_useState8[1];return useEffect(function(){var elem,callback;elem=imgRef.current,callback=function callback(){var imgElem;(imgElem=imgRef.current).src=props.src,imgElem.onload=function(){setImgSrc(props.src),setShowImg(!0),setShowPulsate(!1)}},window.IntersectionObserver?new IntersectionObserver(function(entries,observer){entries.map(function(entry){entry.isIntersecting&&(callback(),observer.unobserve(entry.target))})}).observe(elem):callback()},[]),React.createElement("div",{className:"\n                ".concat(css$8_img_container," \n                ").concat(props.additionalContainerClass?props.additionalContainerClass:""," \n                ").concat(showPulsate?css$8_pulsate:"","\n            ")},React.createElement("img",{src:imgSrc,alt:props.alt,className:"\n                    ".concat(props.additionalImgClass?props.additionalImgClass:""," \n                    ").concat(showImg?"":css$8_hide,"\n                "),ref:imgRef}))}function GridList(props){return React$1.createElement("div",{className:css$7_grid_container},props.listData.map(function(_ref2){var image=_ref2.image,link=_ref2.link,header=_ref2.header,desc=_ref2.desc;return React$1.createElement("div",{className:css$7_grid_item,key:image+link},React$1.createElement("a",{href:link,title:header,target:"_blank"},React$1.createElement(LazyImg,{src:image,alt:header,additionalContainerClass:css$7_img_con}),React$1.createElement("div",{className:css$7_desc},desc||header)))}))}LazyImg.propTypes={src:PropTypes.string.isRequired,alt:PropTypes.string,additionalContainerClass:PropTypes.string,additionalImgClass:PropTypes.string},GridList.propTypes={listData:PropTypes.arrayOf(PropTypes.shape({image:PropTypes.string,link:PropTypes.string,header:PropTypes.string,desc:PropTypes.string})).isRequired};var openSourceProjects=[{header:"Wasabi Artisan",desc:"Wasabi Artisan",link:"https://github.com/rafaelgandi/wasabi_artisan",image:"/images/proj/wasabilogo.png"},{header:"Boot.js",desc:"Boot.js - A Javascript cache and loader.",link:"https://github.com/rafaelgandi/Bootjs",image:"/images/proj/bootjs.jpg"},{header:"RunWhen",desc:"RunWhen - Javascript code dependency checker.",link:"http://rafaelgandi.github.io/RunWhen",image:"/images/proj/runwhen.jpg"},{header:"Monthlyst",desc:"Monthlyst - My simple personal monthly todo list android app.",link:"http://rafaelgandi.github.io/monthlyst",image:"/images/proj/monthlyst.png"},{header:"StashLoader.js",desc:"StashLoader.js - Cache scripts in localStorage for less http requests.",link:"https://github.com/rafaelgandi/StashLoader",image:"/images/proj/stashloader.png"}],projects=[{header:"Jack London Studios",link:"http://www.jacklondonstudios.ca",image:"/images/proj/1.jpg"},{header:"ELS and Equipment Inc.",link:"http://www.engliftsystems.com",image:"/images/proj/2.jpg"},{header:"Biochemicals",link:"http://biochemicals.com.au",image:"/images/proj/3.jpg"},{header:"The Meat-ting Place",link:"http://themeat-tingplace.com.au",image:"/images/proj/4.jpg"},{header:"Skelhire Rental",link:"http://skelhire.smartwebmarketing.com.au",image:"/images/proj/5.jpg"},{header:"School Choice Australia",link:"http://www.schoolchoice.com.au",image:"/images/proj/6.jpg"},{header:"Bargain Shopper Australia",link:"http://bargainshopper.com.au",image:"/images/proj/7.jpg"},{header:"Road Rider Australia",link:"http://roadrider.com.au",image:"/images/proj/8.jpg"},{header:"Green Living",link:"http://unimagslifeetc.businesscatalyst.com",image:"/images/proj/9.jpg"},{header:"Complete Wedding",link:"http://completewedding.com.au",image:"/images/proj/10.jpg"},{header:"Dirt Action Magazine",link:"http://www.dirtaction.com.au",image:"/images/proj/11.jpg"},{header:"Smart Bags",link:"http://uksmartbag.smartwebmarketing.com.au",image:"/images/proj/12.jpg"},{header:"Mobile Central Portal",link:"http://mcportal.com.au",image:"/images/proj/13.jpg"},{header:"My Strata",link:"http://www.mystrata.biz",image:"/images/proj/14.jpg"},{header:"David Southwick Website",link:"http://www.davidsouthwick.com.au",image:"/images/proj/15.jpg"},{header:"Selfstorage Association",link:"http://www.selfstorage.com.au",image:"/images/proj/16.jpg"},{header:"Selfstorage Association Member Site",link:"http://www.selfstorage.org.au",image:"/images/proj/17.jpg"},{header:"Quick Brown Box",link:"http://www.quickbrownbox.com.au",image:"/images/proj/18.jpg"},{header:"Ski Max Holidays",link:"http://skimax.com.au",image:"/images/proj/19.jpg"},{header:"The Reef Movie",link:"http://www.reefmovie.com",image:"/images/proj/20.jpg"},{header:"Tumbleweed",link:"http://tumbleweed.com.au",image:"/images/proj/21.jpg"},{header:"Apres Velo Wear",link:"http://apresvelo.com",image:"/images/proj/22.jpg"},{header:"Velo Vita Sports",link:"http://www.velovita.net.au",image:"/images/proj/23.jpg"},{header:"District Grand Lodge WA",link:"http://www.dglwa.com.au",image:"/images/proj/24.jpg"},{header:"Scottish Masonic Foundation",link:"http://www.smcfwa.com.au",image:"/images/proj/25.jpg"},{header:"Donna Hay Website",link:"http://donnahay.com.au",image:"/images/proj/26.jpg"},{header:"Kids Karate Perth",link:"http://www.kids-karate-perth.com.au/",image:"/images/proj/27.jpg"},{header:"University of Western Australia",link:"http://www.uwastudentguild.com/",image:"/images/proj/28.jpg"}],weapons=[{link:"https://reactjs.org/",image:"images/weapons/react.svg",desc:"React Framework",header:"React"},{link:"https://developer.mozilla.org/en-US/docs/Web/JavaScript",image:"images/weapons/javascript.svg",desc:"Vanilla Javascript",header:"Vanilla Javascript"},{link:"https://nodejs.org/en/",image:"images/weapons/nodejs.svg",desc:"Node.js",header:"Node.js"},{link:"http://php.net/",image:"images/weapons/php.svg",desc:"PHP",header:"PHP"},{link:"http://laravel.com/",image:"images/weapons/laravel.svg",desc:"Laravel PHP Framework",header:"Laravel PHP Framework"},{link:"http://www.mysql.com/",image:"images/weapons/mysql.svg",desc:"MySQL Relational Database",header:"MySQL Relational Database"},{link:"https://graphql.org/",image:"images/weapons/graphql.svg",desc:"GraphQL",header:"GraphQL"},{link:"http://www.w3.org/html/logo/",image:"images/weapons/html5.svg",desc:"HTML5",header:"HTML5"},{link:"https://sass-lang.com/",image:"images/weapons/sass.svg",desc:"Sass",header:"Sass"},{link:"http://phonegap.com/",image:"images/weapons/phonegap.svg",desc:"Phonegap",header:"Phonegap"}];function WebDevPage(){return React$1.createElement(React$1.Fragment,null,React$1.createElement("h1",{className:css$6_web_dev_h1},"Tools I use"),React$1.createElement(GridList,{listData:weapons}),React$1.createElement("hr",null),React$1.createElement("h1",{className:css$6_web_dev_h1,style:{marginTop:"80px"}},"Open source projects"),React$1.createElement(GridList,{listData:openSourceProjects}),React$1.createElement("hr",null),React$1.createElement("h1",{className:css$6_web_dev_h1,style:{marginTop:"80px"}},"Client projects"),React$1.createElement(GridList,{listData:projects}))}var simpleRouter=new(function(){function _class(){_classCallCheck(this,_class);var that=this;this.routes={},window.addEventListener("popstate",function(e){that.navigate(window.location.pathname,e.state)})}_createClass(_class,[{key:"_cleanPathName",value:function _cleanPathName(_pathname){return function(){var _str=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";return _str.replace(/\/$/gi,"").replace(/^\//gi,"")}(_pathname.split(/\.com|\.vm|\.dock/).pop().replace(/\?.+/gi,""))}},{key:"navigate",value:function navigate(_pathname){var _data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;history.pushState(_data,null,_pathname);try{this.routes[this._cleanPathName(_pathname)](_data)}catch(err){}}},{key:"route",value:function route(_pathname,_callback){var _this=this;return _pathname instanceof Array||(_pathname=[_pathname]),_pathname.forEach(function(path){_this.routes[_this._cleanPathName(path)]=_callback}),this}}]);return _class}());ReactDOM.render(React$1.createElement(function(){var _useState9=useState(!1),_useState10=_slicedToArray(_useState9,2),showHomePage=_useState10[0],setShowHomePage=_useState10[1],_useState11=useState(!1),_useState12=_slicedToArray(_useState11,2),showContactPage=_useState12[0],setShowContactPage=_useState12[1],_useState13=useState(!1),_useState14=_slicedToArray(_useState13,2),showWebDevPage=_useState14[0],setShowWebDevPage=_useState14[1],currentPathName=window.location.pathname.trim(),currentUri=parent!==window?document.referrer:document.location.href;function setInitialPage(){if("string"===(_letiable=currentUri,Object.prototype.toString.call(_letiable).slice(8,-1).toLowerCase()))return-1!==currentUri.indexOf(constants.routes.webDevelopment)?void simpleRouter.navigate(constants.routes.webDevelopment):-1!==currentUri.indexOf(constants.routes.contact)?void simpleRouter.navigate(constants.routes.contact):void simpleRouter.navigate("/");var _letiable;simpleRouter.navigate("/")}return useEffect(function(){document.body.style.opacity=1,function(){try{return window.self!==window.top}catch(e){return!0}}()&&void 0!==window.orientation?window.top.location.href=constants.uri.myGithubPageUri:(simpleRouter.route(constants.routes.home,function(){setShowContactPage(!1),setShowWebDevPage(!1),setShowHomePage(!0)}).route(constants.routes.webDevelopment,function(){setShowHomePage(!1),setShowContactPage(!1),setShowWebDevPage(!0)}).route(constants.routes.contact,function(){setShowHomePage(!1),setShowWebDevPage(!1),setShowContactPage(!0)}),setInitialPage())},[]),React$1.createElement(Container,{id:"raffy-wrapper"},React$1.createElement(Row,null,React$1.createElement(Col,null,React$1.createElement(Header,{onNavigate:function onNavigate(id,isExternal){isExternal?window.open(id):(window.scrollTo(0,0),simpleRouter.navigate(id))},defaultActiveKey:currentPathName}),React$1.createElement("div",{id:css_pages_wrapper},React$1.createElement(PageSection,{id:"raffy-page-home",show:showHomePage},React$1.createElement(HomePage,null)),React$1.createElement(PageSection,{id:"raffy-page-web-dev",show:showWebDevPage},React$1.createElement(WebDevPage,null)),React$1.createElement(PageSection,{id:"raffy-page-contact",show:showContactPage},React$1.createElement(ContactPage,null))))))},null),document.getElementById("placeholder-raffy-layout-component"))}}});