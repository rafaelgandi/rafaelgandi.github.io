/* See: https://github.com/jonathantneal/closest */
;!function(e){var t=e.Element.prototype;"function"!=typeof t.matches&&(t.matches=t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),o=0;t[o]&&t[o]!==this;)++o;return Boolean(t[o])}),"function"!=typeof t.closest&&(t.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window);
// See: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
// See: https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign != 'function') {
  Object.defineProperty(Object,"assign",{value:function assign(target,varArgs){"use strict";if(target==null)throw new TypeError("Cannot convert undefined or null to object");var to=Object(target);for(var index=1;index<arguments.length;index++){var nextSource=arguments[index];if(nextSource!=null)for(var nextKey in nextSource)Object.prototype.hasOwnProperty.call(nextSource,nextKey)&&(to[nextKey]=nextSource[nextKey])}return to},writable:!0,configurable:!0});
}