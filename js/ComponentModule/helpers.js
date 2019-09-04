let weakMap = new WeakMap();	
export ({				
	Image: {
		isValid: function (_filename) {
			var imgExt = 'png,jpg,jpeg,gif'.split(','),
				ext = _filename.trim().toLowerCase().split('.').pop();
			if ($.inArray(ext, imgExt) === -1) { return false; }	
			return true;
		}
	},	
	pint: function (_str) {
		var num = parseInt(_str, 10);
		if (isNaN(num)) { return 0; }
		return num;
	},	
	isEmail: function (_email) {
		var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			e = $.trim(_email);
		if (e.length > 50) { return false }
		return !! emailRegExp.test(e);
	},	
	isNumeric: function (_num) {
		var n = _num;
		// See: http://stackoverflow.com/a/1830844
		return !isNaN(parseFloat(n)) && isFinite(n);
	},	
	sc: (function () {
		// Selector Cacher //
		var elems = {};
		return function (_selector) {
			if (! elems[_selector]) {
				elems[_selector] = $(_selector);
			}
			return elems[_selector];
		};
	})(),
	unescapeUnicode: function (_str) {
		// See: http://stackoverflow.com/questions/7885096/how-do-i-decode-a-string-with-escaped-unicode
		var r = /\\u([\d\w]{4})/gi;
		_str = (_str+'').replace(r, function (match, grp) {
			return String.fromCharCode(parseInt(grp, 16)); 
		});
		_str = unescape(_str);
		return _str;
	},	
	dom: {
		append: (_element, _appendThis) => {
			return _element.appendChild(_appendThis)
		},
		prepend: (_element, _prependThis) => {
			// See: https://clubmate.fi/append-and-prepend-elements-with-pure-javascript/
			return _element.insertBefore(_prependThis, _element.firstChild);
		},
		empty: (_element) => {
			while (_element.firstChild) {
				 _element.removeChild(_element.firstChild)
			}
		},
		replaceWith: (_oldElement, _newElement) => {
	        // See: https://usefulangle.com/post/82/pure-javascript-replace-element
	        if (! Element.prototype.replaceWith && typeof _newElement == 'object') { // For old browers
	            let parent = _oldElement.parentNode;
	            parent.replaceChild(_newElement, _oldElement);
	        }
	        else {
	            _oldElement.replaceWith(_newElement);
	        }            
	    },
		data: (_element, _key, _value = null) => {
			// See: https://blog.garstasio.com/you-dont-need-jquery/utils/#associate-data-with-an-html-element
			if (! weakMap.get(_element)) { weakMap.set(_element, {}); }
			let data = weakMap.get(_element);
			if (_value) {
				data[_key] = _value;
				weakMap.set(_element, data);
				return _element;
			}
			else {
				return data[_key];
			}
		}
	},
	css: function (_src, _callback) {
		let $head = document.getElementsByTagName('head')[0],
			$link = document.createElement('link');
		$link.rel = 'stylesheet';	
		$link.type = 'text/css';	
		$link.href =  _src + '?'+(new Date()).getTime();	
		this.dom[(_callback === true) ? 'prepend' : 'append']($head, $link);
		//_callback = _callback || false;
		//if (_callback) {
			// Cool technique to know when the stylesheet is loaded.
			// See: http://www.backalleycoder.com/2011/03/20/link-tag-css-stylesheet-load-event/
			var img = document.createElement('img');
			img.onerror = function () {
				if(typeof _callback == 'function') { _callback(); }
			}
			img.src = _src;	
		//}			
	},	
	tpl: function (s,d) {
		// See: http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/	
		for(var p in d) {
			s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
		}	   
		return s;
	},	
	log: function (_msg) {
		console.log(_msg);
	},		
	removeFromArray: function (_arr, _item) {
		// See: http://stackoverflow.com/a/5767357
		// See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
		var index = _arr.indexOf(_item);
		if (index === -1) { return _arr; }
		_arr.splice(index, 1);
		return _arr; 
	},	
	uniqueOnly: function (_arr) {
		// See: http://stackoverflow.com/a/14438954
		return _arr.filter(function (value, index, self) {
			return self.indexOf(value) === index;
		});
	},	
	kcode: {
		arrowUp: 38,    
		arrowDown: 40,
		enter: 13,
		esc: 27    
	},		
	isjQueryElem: (_elem) => {
		return typeof _elem.attr !== 'undefined';
	},	
	isJson: function (_str) {
		try {
			JSON.parse(_str);
			return true;
		}
		catch (e) {
			return false;
		}
	},
	iterateComponentTag: function (moduleId, _callback) {
		var type = moduleId.replace(/\//ig, '-');
		document.querySelectorAll(`Component[type="${ type }"]`).forEach((elem) => {
			_callback(elem);
		});
	},
	tagTemplateHtml: function (_strings, ..._values) {
		// See: http://wesbos.com/tagged-template-literals/
		let str = '';
		_strings.forEach((_strings, i) => {
		   str += _strings + (_values[i] || '');
		});
		return str;
	},
	ixr: function (_modId, _name) {
		var mod = _modId.replace(/\//ig, '_');
		return mod + '8__' + _name + '__8';
	},
	typeOf: function (_variable) {
		// See: https://gomakethings.com/true-type-checking-with-vanilla-js/
		return Object.prototype.toString.call(_variable).slice(8, -1).toLowerCase();
	},
	on: function (_element, _eventName, _selector, _callback = (() => {}), _eventParam = false) {
		let that = this;
		_callback = (this.typeOf(_selector) === 'function') ? _selector : _callback;
		_element.addEventListener(_eventName, function (e) {
			if (that.typeOf(_selector) === 'string') {
				if (e.target.matches(_selector)) {
					_callback.call(e.target, e);
				}
			}
			else {
				_callback.call(this, e);
			}
		}, _eventParam);
		return this;
	}
});