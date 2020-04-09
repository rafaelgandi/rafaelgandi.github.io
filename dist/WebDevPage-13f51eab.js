System.register(["./index-d480fb75.js","/src/third-party/bootstrap/js/react-bootstrap.min.js","/src/third-party/react/prop-types.development.js"],(function(exports){"use strict";var useRef,useState,useEffect,React$1,PropTypes;return{setters:[function(module){useRef=module.u,useState=module.a,useEffect=module.b,React$1=module.R},function(){},function(module){PropTypes=module.default}],execute:function(){exports("default",(function(){return React$1.createElement(React$1.Fragment,null,React$1.createElement("h1",{className:css_web_dev_h1},"Tools I use"),React$1.createElement(GridList,{listData:weapons}),React$1.createElement("hr",null),React$1.createElement("h1",{className:css_web_dev_h1,style:{marginTop:"80px"}},"Open source projects"),React$1.createElement(GridList,{listData:openSourceProjects}),React$1.createElement("hr",null),React$1.createElement("h1",{className:css_web_dev_h1,style:{marginTop:"80px"}},"Client projects"),React$1.createElement(GridList,{listData:projects}))}));var css_web_dev_h1="WebDevPage_cholo47c7a6b278094381145f038198d46262_nk8__web-dev-h1__8ie",css$1_grid_container="GridList_cholo7609e136b7d4ac04235f34562afacf58_nk8__grid-container__8ie",css$1_grid_item="GridList_cholo7609e136b7d4ac04235f34562afacf58_nk8__grid-item__8ie",css$1_img_con="GridList_cholo7609e136b7d4ac04235f34562afacf58_nk8__img-con__8ie",css$1_desc="GridList_cholo7609e136b7d4ac04235f34562afacf58_nk8__desc__8ie",css$2_pulsate="LazyImg_cholo0e4e47b253fbca773982babc2470882d_nk8__pulsate__8ie",css$2_hide="LazyImg_cholo0e4e47b253fbca773982babc2470882d_nk8__hide__8ie",css$2_img_container="LazyImg_cholo0e4e47b253fbca773982babc2470882d_nk8__img-container__8ie";function LazyImg(props){const imgRef=useRef(),[imgSrc,setImgSrc]=useState(""),[showImg,setShowImg]=useState(!1),[showPulsate,setShowPulsate]=useState(!0);return useEffect(()=>{var elem,callback;elem=imgRef.current,callback=()=>{var imgElem;(imgElem=imgRef.current).src=props.src,imgElem.onload=()=>{setImgSrc(props.src),setShowImg(!0),setShowPulsate(!1)}},window.IntersectionObserver?new IntersectionObserver((entries,observer)=>{entries.map(entry=>{entry.isIntersecting&&(callback(),observer.unobserve(entry.target))})}).observe(elem):callback()},[]),React.createElement("div",{className:`\n                ${css$2_img_container} \n                ${props.additionalContainerClass?props.additionalContainerClass:""} \n                ${showPulsate?css$2_pulsate:""}\n            `},React.createElement("img",{src:imgSrc,alt:props.alt,className:`\n                    ${props.additionalImgClass?props.additionalImgClass:""} \n                    ${showImg?"":css$2_hide}\n                `,ref:imgRef}))}function GridList(props){return React$1.createElement("div",{className:css$1_grid_container},props.listData.map(({image:image,link:link,header:header,desc:desc})=>React$1.createElement("div",{className:css$1_grid_item,key:image+link},React$1.createElement("a",{href:link,title:header,target:"_blank"},React$1.createElement(LazyImg,{src:image,alt:header,additionalContainerClass:css$1_img_con}),React$1.createElement("div",{className:css$1_desc},desc||header)))))}LazyImg.propTypes={src:PropTypes.string.isRequired,alt:PropTypes.string,additionalContainerClass:PropTypes.string,additionalImgClass:PropTypes.string},GridList.propTypes={listData:PropTypes.arrayOf(PropTypes.shape({image:PropTypes.string,link:PropTypes.string,header:PropTypes.string,desc:PropTypes.string})).isRequired};var openSourceProjects=[{header:"Wasabi Artisan",desc:"Wasabi Artisan",link:"https://github.com/rafaelgandi/wasabi_artisan",image:"/images/proj/wasabilogo.png"},{header:"Boot.js",desc:"Boot.js - A Javascript cache and loader.",link:"https://github.com/rafaelgandi/Bootjs",image:"/images/proj/bootjs.jpg"},{header:"RunWhen",desc:"RunWhen - Javascript code dependency checker.",link:"http://rafaelgandi.github.io/RunWhen",image:"/images/proj/runwhen.jpg"},{header:"Monthlyst",desc:"Monthlyst - My simple personal monthly todo list android app.",link:"http://rafaelgandi.github.io/monthlyst",image:"/images/proj/monthlyst.png"},{header:"StashLoader.js",desc:"StashLoader.js - Cache scripts in localStorage for less http requests.",link:"https://github.com/rafaelgandi/StashLoader",image:"/images/proj/stashloader.png"}],projects=[{header:"Jack London Studios",link:"http://www.jacklondonstudios.ca",image:"/images/proj/1.jpg"},{header:"ELS and Equipment Inc.",link:"http://www.engliftsystems.com",image:"/images/proj/2.jpg"},{header:"Biochemicals",link:"http://biochemicals.com.au",image:"/images/proj/3.jpg"},{header:"The Meat-ting Place",link:"http://themeat-tingplace.com.au",image:"/images/proj/4.jpg"},{header:"Skelhire Rental",link:"http://skelhire.smartwebmarketing.com.au",image:"/images/proj/5.jpg"},{header:"School Choice Australia",link:"http://www.schoolchoice.com.au",image:"/images/proj/6.jpg"},{header:"Bargain Shopper Australia",link:"http://bargainshopper.com.au",image:"/images/proj/7.jpg"},{header:"Road Rider Australia",link:"http://roadrider.com.au",image:"/images/proj/8.jpg"},{header:"Green Living",link:"http://unimagslifeetc.businesscatalyst.com",image:"/images/proj/9.jpg"},{header:"Complete Wedding",link:"http://completewedding.com.au",image:"/images/proj/10.jpg"},{header:"Dirt Action Magazine",link:"http://www.dirtaction.com.au",image:"/images/proj/11.jpg"},{header:"Smart Bags",link:"http://uksmartbag.smartwebmarketing.com.au",image:"/images/proj/12.jpg"},{header:"Mobile Central Portal",link:"http://mcportal.com.au",image:"/images/proj/13.jpg"},{header:"My Strata",link:"http://www.mystrata.biz",image:"/images/proj/14.jpg"},{header:"David Southwick Website",link:"http://www.davidsouthwick.com.au",image:"/images/proj/15.jpg"},{header:"Selfstorage Association",link:"http://www.selfstorage.com.au",image:"/images/proj/16.jpg"},{header:"Selfstorage Association Member Site",link:"http://www.selfstorage.org.au",image:"/images/proj/17.jpg"},{header:"Quick Brown Box",link:"http://www.quickbrownbox.com.au",image:"/images/proj/18.jpg"},{header:"Ski Max Holidays",link:"http://skimax.com.au",image:"/images/proj/19.jpg"},{header:"The Reef Movie",link:"http://www.reefmovie.com",image:"/images/proj/20.jpg"},{header:"Tumbleweed",link:"http://tumbleweed.com.au",image:"/images/proj/21.jpg"},{header:"Apres Velo Wear",link:"http://apresvelo.com",image:"/images/proj/22.jpg"},{header:"Velo Vita Sports",link:"http://www.velovita.net.au",image:"/images/proj/23.jpg"},{header:"District Grand Lodge WA",link:"http://www.dglwa.com.au",image:"/images/proj/24.jpg"},{header:"Scottish Masonic Foundation",link:"http://www.smcfwa.com.au",image:"/images/proj/25.jpg"},{header:"Donna Hay Website",link:"http://donnahay.com.au",image:"/images/proj/26.jpg"},{header:"Kids Karate Perth",link:"http://www.kids-karate-perth.com.au/",image:"/images/proj/27.jpg"},{header:"University of Western Australia",link:"http://www.uwastudentguild.com/",image:"/images/proj/28.jpg"}],weapons=[{link:"https://reactjs.org/",image:"images/weapons/react.svg",desc:"React Framework",header:"React"},{link:"https://developer.mozilla.org/en-US/docs/Web/JavaScript",image:"images/weapons/javascript.svg",desc:"Vanilla Javascript",header:"Vanilla Javascript"},{link:"https://nodejs.org/en/",image:"images/weapons/nodejs.svg",desc:"Node.js",header:"Node.js"},{link:"http://php.net/",image:"images/weapons/php.svg",desc:"PHP",header:"PHP"},{link:"http://laravel.com/",image:"images/weapons/laravel.svg",desc:"Laravel PHP Framework",header:"Laravel PHP Framework"},{link:"http://www.mysql.com/",image:"images/weapons/mysql.svg",desc:"MySQL Relational Database",header:"MySQL Relational Database"},{link:"https://graphql.org/",image:"images/weapons/graphql.svg",desc:"GraphQL",header:"GraphQL"},{link:"http://www.w3.org/html/logo/",image:"images/weapons/html5.svg",desc:"HTML5",header:"HTML5"},{link:"https://sass-lang.com/",image:"images/weapons/sass.svg",desc:"Sass",header:"Sass"},{link:"http://phonegap.com/",image:"images/weapons/phonegap.svg",desc:"Phonegap",header:"Phonegap"}]}}}));
//# sourceMappingURL=WebDevPage-13f51eab.js.map
