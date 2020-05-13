System.register(["/src/third-party/bootstrap/js/react-bootstrap.min.js","/src/third-party/react/prop-types.development.js"],(function(exports,module){"use strict";var ReactBootstrap,PropTypes;return{setters:[function(module){ReactBootstrap=module.default},function(module){PropTypes=module.default}],execute:function(){const useState=exports("a",window.React.useState),useEffect=exports("b",window.React.useEffect),Suspense=(window.React.useContext,window.React.useReducer,window.React.useCallback,window.React.useMemo,exports("u",window.React.useRef),window.React.useImperativeHandle,window.React.useLayoutEffect,window.React.useDebugValue,window.React.Component,window.React.Suspense);var React$1=exports("R",window.React),ReactDOM=window.ReactDOM,css_pages_wrapper="index_cholob8679ac4daf1648bc97eb3a75bc69615_nk8__pages-wrapper__8ie";ReactBootstrap.AbstractNav,ReactBootstrap.AbstractNavItem,ReactBootstrap.Accordion,ReactBootstrap.AccordionCollapse,ReactBootstrap.AccordionContext,ReactBootstrap.AccordionToggle,ReactBootstrap.Alert,ReactBootstrap.Badge,ReactBootstrap.BootstrapModalManager,ReactBootstrap.Breadcrumb,ReactBootstrap.BreadcrumbItem,ReactBootstrap.Button,ReactBootstrap.ButtonGroup,ReactBootstrap.ButtonToolbar,ReactBootstrap.Card,ReactBootstrap.CardColumns,ReactBootstrap.CardContext,ReactBootstrap.CardDeck,ReactBootstrap.CardGroup,ReactBootstrap.CardImg,ReactBootstrap.Carousel,ReactBootstrap.CarouselCaption,ReactBootstrap.CarouselItem,ReactBootstrap.CloseButton;const Col=ReactBootstrap.Col,Container=(ReactBootstrap.Collapse,ReactBootstrap.Container),Nav=(ReactBootstrap.Dropdown,ReactBootstrap.DropdownButton,ReactBootstrap.DropdownItem,ReactBootstrap.DropdownMenu,ReactBootstrap.DropdownToggle,ReactBootstrap.ElementChildren,ReactBootstrap.Fade,ReactBootstrap.Feedback,ReactBootstrap.Figure,ReactBootstrap.FigureCaption,ReactBootstrap.FigureImage,ReactBootstrap.Form,ReactBootstrap.FormCheck,ReactBootstrap.FormCheckInput,ReactBootstrap.FormCheckLabel,ReactBootstrap.FormContext,ReactBootstrap.FormControl,ReactBootstrap.FormGroup,ReactBootstrap.FormLabel,ReactBootstrap.FormText,ReactBootstrap.Image,ReactBootstrap.InputGroup,ReactBootstrap.Jumbotron,ReactBootstrap.ListGroup,ReactBootstrap.ListGroupItem,ReactBootstrap.Media,ReactBootstrap.Modal,ReactBootstrap.ModalBody,ReactBootstrap.ModalContext,ReactBootstrap.ModalDialog,ReactBootstrap.ModalFooter,ReactBootstrap.ModalHeader,ReactBootstrap.ModalTitle,ReactBootstrap.Nav),Navbar=(ReactBootstrap.NavContext,ReactBootstrap.NavDropdown,ReactBootstrap.NavItem,ReactBootstrap.NavLink,ReactBootstrap.Navbar),Row=(ReactBootstrap.NavbarBrand,ReactBootstrap.NavbarCollapse,ReactBootstrap.NavbarContext,ReactBootstrap.NavbarToggle,ReactBootstrap.Overlay,ReactBootstrap.OverlayTrigger,ReactBootstrap.PageItem,ReactBootstrap.Pagination,ReactBootstrap.Popover,ReactBootstrap.PopoverContent,ReactBootstrap.PopoverTitle,ReactBootstrap.ProgressBar,ReactBootstrap.ResponsiveEmbed,ReactBootstrap.Row),Spinner=(ReactBootstrap.SafeAnchor,ReactBootstrap.SelectableContext,ReactBootstrap.Spinner);ReactBootstrap.SplitButton,ReactBootstrap.Switch,ReactBootstrap.Tab,ReactBootstrap.TabContainer,ReactBootstrap.TabContent,ReactBootstrap.TabContext,ReactBootstrap.TabPane,ReactBootstrap.Table,ReactBootstrap.Tabs,ReactBootstrap.ThemeProvider,ReactBootstrap.Toast,ReactBootstrap.ToastBody,ReactBootstrap.ToastContext,ReactBootstrap.ToastHeader,ReactBootstrap.ToggleButton,ReactBootstrap.ToggleButtonGroup,ReactBootstrap.Tooltip;var css$1_profile_pic="Header_cholo2e64ec1b2897cdb887770a9d6ad8bea5_nk8__profile-pic__8ie",css$1_initial_profile_pic="Header_cholo2e64ec1b2897cdb887770a9d6ad8bea5_nk8__initial-profile-pic__8ie",css$1_responsive_navbar_nav="Header_cholo2e64ec1b2897cdb887770a9d6ad8bea5_nk8__responsive-navbar-nav__8ie";function Header(props){const intialProfPicImgBase64Str="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wEEEAAsACwALAAsAC8ALAAyADcANwAyAEUASwBCAEsARQBmAF4AVgBWAF4AZgCbAG8AdwBvAHcAbwCbAOsAkwCsAJMAkwCsAJMA6wDQAPwAzQC/AM0A/ADQAXYBJgEEAQQBJgF2AbABawFXAWsBsAIMAdQB1AIMApMCcgKTA10DXQSGEQAsACwALAAsAC8ALAAyADcANwAyAEUASwBCAEsARQBmAF4AVgBWAF4AZgCbAG8AdwBvAHcAbwCbAOsAkwCsAJMAkwCsAJMA6wDQAPwAzQC/AM0A/ADQAXYBJgEEAQQBJgF2AbABawFXAWsBsAIMAdQB1AIMApMCcgKTA10DXQSG/8IAEQgAZABkAwEiAAIRAQMRAf/EABkAAAMBAQEAAAAAAAAAAAAAAAABAwIEBf/aAAgBAQAAAAD1ASWQYFUCWQYFBHDO3QwChk8rqV9gPZLEK46GDNkpONK6AKEpTxcVhlFx8CL38/u7ArDzE8w9E5fU0W4OHbI7780oW8uCqlDs6Xt285clc6zz+hfbt50pbY+fqvY//8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/9oACAECEAAAAABm0MXQZmxEm7IY1vMpN//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/2gAIAQMQAAAAhKHXOBOzkHS84bXXFdx0xz1vJef/xAAqEAEAAgIABAQHAAMAAAAAAAABAAIDERASITEEIDAyIjNBQlFhcVKBwf/aAAgBAQABPwDzPqvp+J8U0tyU98sUt71szHy0Pc8r+X0Vm4418Ta30bQp+FIVERT+MpvXoWm5YC+t/uD0js7O2V7HoW4ZKjTf1JRe0aVuah39C0UOq6I56X3Ss3y2gy1ylWzDxOF+6bE2eVdTNn5egS7az1dwI3v/AJTBmX4bd5lq2xdOsRHSaZ4fJ9j5c1tEtbb/ALmuCR2TBZcVTmmfG3ruvcmNdjK25gfJ4i22W2SrsODLV6EwX5L8r2YMcdNtuUlNHQ4vQmV3eXTTMb8B/OF+0ToEyEw5eev7IM/ZxZk+ZM9imOY/bWbj1SMsbGVs477mO5aHF7Mt8yeK9tZT/kJ9TgTIG5UDBRlF0cf/xAAcEQEBAAICAwAAAAAAAAAAAAABABAgAjERITD/2gAIAQIBAT8A+Kxs+mNkW8bsMYYctxw9Rl6bjj//xAAfEQACAgEFAQEAAAAAAAAAAAAAAQIREAMgITFBMDL/2gAIAQMBAT8A+MUTW6LtE+dtEWki+Brcuxxsap4XaGqynZqeYj+kS7z6jUx//9k=",[profPicData,setProfPicData]=useState({webp:intialProfPicImgBase64Str,moz:intialProfPicImgBase64Str,fallback:intialProfPicImgBase64Str,initialProfPicClass:css$1_initial_profile_pic}),links=[{link:"/",linkLabel:"Me"},{link:"https://medium.com/rafael-gandionco",linkLabel:"Blog",external:!0},{link:"http://tinyurl.com/RafaelGandioncoPhotography",linkLabel:"Photography",external:!0},{link:"/web-development",linkLabel:"Web Development"},{link:"/contact",linkLabel:"Contact"}];function handleNavigateClick(e){e.preventDefault();let id=e.currentTarget.rel,isExternal=!!parseInt(e.currentTarget.getAttribute("data-is-external"),10);props.onNavigate(id,isExternal)}return useEffect(()=>{!function(){const i=new Image;i.src="images/profile3_comp.webp",i.onload=()=>{setProfPicData({webp:"images/profile3_comp.webp",moz:"images/profile3_comp_moz.jpg",fallback:"images/profile3_comp.jpg",initialProfPicClass:""})}}()},[]),React.createElement(Navbar,{collapseOnSelect:!0,expand:"lg",bg:"raffy-navbar",fixed:"top"},React.createElement(Navbar.Brand,{href:links[0].link,className:css$1_profile_pic},React.createElement("picture",{className:profPicData.initialProfPicClass,title:"Hi!"},React.createElement("source",{type:"image/webp",srcSet:profPicData.webp}),React.createElement("source",{type:"image/jpeg",srcSet:profPicData.moz}),React.createElement("img",{src:profPicData.fallback,alt:"rafael gadionco"}))),React.createElement(Navbar.Toggle,{"aria-controls":css$1_responsive_navbar_nav}),React.createElement(Navbar.Collapse,{id:css$1_responsive_navbar_nav,className:"justify-content-end"},React.createElement(Nav,{defaultActiveKey:props.defaultActiveKey?props.defaultActiveKey:"/"},links.map(({link:link,linkLabel:linkLabel,external:external})=>React.createElement(Nav.Item,{key:link},React.createElement(Nav.Link,{rel:link,href:link,"data-is-external":external?1:0,onClick:handleNavigateClick,eventKey:link},linkLabel))))))}Header.propTypes={onNavigate:PropTypes.func.isRequired,defaultActiveKey:PropTypes.string};var css$2_page_sections="PageSection_cholo5a3a98e9f13a4f1f3e60a2da32da0876_nk8__page-sections__8ie",css$2_page_spinner="PageSection_cholo5a3a98e9f13a4f1f3e60a2da32da0876_nk8__page-spinner__8ie",css$2_show="PageSection_cholo5a3a98e9f13a4f1f3e60a2da32da0876_nk8__show__8ie";const PageSpinner=()=>React.createElement("div",{className:"text-center mt-5"},React.createElement(Spinner,{animation:"grow",className:css$2_page_spinner}));function PageSection(props){return React.createElement("section",{id:props.id,className:`${css$2_page_sections} ${props.show?css$2_show:""}`},props.suspense?React.createElement(Suspense,{fallback:React.createElement(PageSpinner,null)},props.children):props.children)}PageSection.propTypes={id:PropTypes.string.isRequired,show:PropTypes.bool.isRequired,suspense:PropTypes.bool};var css$3_bigger_text="HomePage_cholo629ae4011f036fab4efbf3070f9282ce_nk8__bigger-text__8ie";function HomePage(){return React$1.createElement("p",{id:css$3_bigger_text,style:{marginTop:"2.6em"},className:"text-center"},"Hi, my name's Rafael Gandionco and I'm a minimalist, web developer, and photographer from the Philippines.")}var simpleRouter=new class{constructor(){let that=this;this.routes={},window.addEventListener("popstate",(function(e){that.navigate(window.location.pathname,e.state)}))}_cleanPathName(_pathname){return function(_str=""){return _str.replace(/\/$/gi,"").replace(/^\//gi,"")}(_pathname.split(/\.com|\.vm|\.dock/).pop().replace(/\?.+/gi,""))}navigate(_pathname,_data=null){history.pushState(_data,null,_pathname);try{this.routes[this._cleanPathName(_pathname)](_data)}catch(err){}}route(_pathname,_callback){return _pathname instanceof Array||(_pathname=[_pathname]),_pathname.forEach(path=>{this.routes[this._cleanPathName(path)]=_callback}),this}};var constants=exports("c",{uri:{instagram:"https://www.instagram.com/rafaelgandi/",facebook:"https://www.facebook.com/rafaelgandi",linkedin:"https://ph.linkedin.com/in/rafael-gandionco-670a1745",zerothreetwo:"http://zerothreetwo.com/author/rafaelgandi/",medium:"https://medium.com/rafael-gandionco",flickr:"https://www.flickr.com/photos/rafaelgandi/",fiveHundredPx:"https://500px.com/rafaelgandi",eyeem:"https://www.eyeem.com/u/rafaelgandi",github:"https://github.com/rafaelgandi",myGithubPageUri:"http://rafaelgandi.github.com",googlePhotosPage:"http://tinyurl.com/RafaelGandioncoPhotography"},routes:{home:"/",blog:"/blog",photography:"/photography",webDevelopment:"/web-development",contact:"/contact",map:"/find-us-here"}});const WebDevPage=React$1.lazy(()=>module.import("./WebDevPage-9251701a.js")),ContactPage=React$1.lazy(()=>module.import("./ContactPage-fa39e984.js")),MapPage=React$1.lazy(()=>module.import("./MapPage-6ba9d0b2.js"));ReactDOM.render(React$1.createElement(()=>{const[showHomePage,setShowHomePage]=useState(!1),[showContactPage,setShowContactPage]=useState(!1),[showWebDevPage,setShowWebDevPage]=useState(!1),[showMapPage,setShowMapPage]=useState(!1),currentPathName=window.location.pathname.trim(),currentUri=parent!==window?document.referrer:document.location.href;function setInitialPage(){if("string"===(_letiable=currentUri,Object.prototype.toString.call(_letiable).slice(8,-1).toLowerCase()))return-1!==currentUri.indexOf(constants.routes.webDevelopment)?void simpleRouter.navigate(constants.routes.webDevelopment):-1!==currentUri.indexOf(constants.routes.contact)?void simpleRouter.navigate(constants.routes.contact):void simpleRouter.navigate("/");var _letiable;simpleRouter.navigate("/")}return useEffect(()=>{document.body.style.opacity=1,function(){try{return window.self!==window.top}catch(e){return!0}}()&&void 0!==window.orientation?window.top.location.href=constants.uri.myGithubPageUri:(simpleRouter.route(constants.routes.home,()=>{setShowContactPage(!1),setShowWebDevPage(!1),setShowHomePage(!0),setShowMapPage(!1)}).route(constants.routes.webDevelopment,()=>{setShowHomePage(!1),setShowContactPage(!1),setShowWebDevPage(!0),setShowMapPage(!1)}).route(constants.routes.contact,()=>{setShowHomePage(!1),setShowWebDevPage(!1),setShowContactPage(!0),setShowMapPage(!1)}).route(constants.routes.map,()=>{setShowHomePage(!1),setShowWebDevPage(!1),setShowContactPage(!1),setShowMapPage(!0)}),setInitialPage())},[]),React$1.createElement(Container,{id:"raffy-wrapper"},React$1.createElement(Row,null,React$1.createElement(Col,null,React$1.createElement(Header,{onNavigate:function(id,isExternal){isExternal?window.open(id):(window.scrollTo(0,0),simpleRouter.navigate(id))},defaultActiveKey:currentPathName}),React$1.createElement("div",{id:css_pages_wrapper},React$1.createElement(PageSection,{id:"raffy-page-home",show:showHomePage},React$1.createElement(HomePage,null)),React$1.createElement(PageSection,{id:"raffy-page-web-dev",show:showWebDevPage,suspense:!0},React$1.createElement(WebDevPage,null)),React$1.createElement(PageSection,{id:"raffy-page-contact",show:showContactPage,suspense:!0},React$1.createElement(ContactPage,null)),React$1.createElement(PageSection,{id:"raffy-page-map",show:showMapPage,suspense:!0},React$1.createElement(MapPage,null))))))},null),document.getElementById("placeholder-raffy-layout-component"))}}}));
//# sourceMappingURL=index-17c0dd17.js.map
