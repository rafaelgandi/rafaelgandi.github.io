
export function tpl(s,d) {
    // See: http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/	
    for (let p in d) {
        s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
    }	   
    return s;
}

export function removeFromArray(arr, item) { 
    // See: http://stackoverflow.com/a/5767357
    // See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    let index = arr.indexOf(item);
    if (index === -1) { return arr; }
    arr.splice(index, 1);
    return arr; 
}

export const kcode = {
    arrowUp: 38,    
    arrowDown: 40,
    enter: 13,
    esc: 27    
};		

export function isjQueryElem(_elem) {
    return typeof _elem.attr !== 'undefined';
}

export function isJson(_str) {
    try {
        JSON.parse(_str);
        return true;
    }
    catch (e) {
        return false;
    }
}

export function typeOf(_letiable) {
    // See: https://gomakethings.com/true-type-checking-with-vanilla-js/
    return Object.prototype.toString.call(_letiable).slice(8, -1).toLowerCase();
}

export function simpleCopy(objOrArr) {
    if (typeOf(objOrArr) !== 'array' && typeOf(objOrArr) !== 'object') { return objOrArr; }
    // See: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript     
    return JSON.parse(JSON.stringify(objOrArr));
}

export function addCss(css){ // See: https://stackoverflow.com/q/3922139
    const head = document.getElementsByTagName('head')[0];
    const s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    css = css.replace(/<style>/ig, '').replace(/<\/style>/ig, '');
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else { // the world
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
 }
 
 export function unescapeUnicode(str) {
     // See: http://stackoverflow.com/questions/7885096/how-do-i-decode-a-string-with-escaped-unicode
     let r = /\\u([\d\w]{4})/gi;
     str = (str+'').replace(r, function (match, grp) {
         return String.fromCharCode(parseInt(grp, 16)); 
     });
     str = unescape(str);
     return str;
 }
 
 export function pint (_str) {
     let num = parseInt(_str, 10);
     if (isNaN(num)) { return 0; }
     return num;
 }	
 
 export function isEmail(email) {
     let emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         e = email.trim();
     if (e.length > 50) { return false; }
     return !! emailRegExp.test(e);
 }	
 
 export function isNumeric(_num) {
     let n = _num;
     // See: http://stackoverflow.com/a/1830844 
     return !isNaN(parseFloat(n)) && isFinite(n); 
 }
 
 export function html(_strings, ..._values) {
     // See: http://wesbos.com/tagged-template-literals/
     let str = '';
     _strings.forEach((_strings, i) => {
        str += _strings + (_values[i] || '');
     });
     return str;
 }
 
 export function isEmptyObject(_obj) {
     // See: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
     try {
         return Object.entries(_obj).length === 0 && _obj.constructor === Object;
     }
     catch (err) {
         try {
             return Object.keys(_obj).length === 0 && _obj.constructor === Object;
         } catch (err2) {
             for (let prop in _obj) {
                 if (_obj.hasOwnProperty(prop)) {
                     return false;
                 }                            
             }
             return JSON.stringify(_obj) === JSON.stringify({});
         }            
     }
 }
 
export function isInsideFrame() {
     // See: http://stackoverflow.com/a/326076
     try { return window.self !== window.top; } 
     catch (e) { return true; }
}
 
export function  isMobile() {
     // See: http://stackoverflow.com/a/14301832
     return typeof window.orientation !== 'undefined';
} 
 
 
 
 