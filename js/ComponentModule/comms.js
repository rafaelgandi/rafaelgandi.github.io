/*
	Comms Event Bus
	@author: Rafael Gandionco <www.rafaelgandi.tk>
*/
define((require) => {
	"use strict"
	require('./pubsub.min');
	// Infinit loop checker //
	var calledOnceEvents = {},
		eventData = {},
		loopChecker = (() => {
			const MAX_CALLS = 10000;
			var check = {};
			return (_event) => {
				if (typeof check[_event] === 'undefined') {
					check[_event] = 0;
				}
				check[_event]++;
				if (check[_event] > MAX_CALLS) {
					//console.warn('Comms Error: Possible infinite loop from event "'+_event+'"');
					throw 'Comms Error: Possible infinite loop from event "'+_event+'"';
				}
			};
		})(),
		rememberEvent = (_event, _data) => {
			if (! (_event in calledOnceEvents)) {
				calledOnceEvents[_event] = (typeof _data !== 'undefined') ? _data : null;
			}
		};
	
	// Channel class //
	function _Channel(_channelName) {
		this.channel = _channelName.trim();
	}
	function _normalzeEventName(_event) {
		return this.channel + '->' + _event;
	}
	_Channel.prototype.say = function (_event, _data) {
		let eventName = _normalzeEventName.call(this, _event);
		loopChecker(eventName);
		PubSub.publish(eventName, _data);
		return this;
	};
	_Channel.prototype.listen = function (_event, _callback) {
		var that = this;
		if (! (_event instanceof Array)) { _event = [_event]; }
		_event.forEach((e) => {
			let eventName = _normalzeEventName.call(that, e);
			if (eventName in calledOnceEvents) {
				_callback(calledOnceEvents[eventName]);
				return true;
			}
			PubSub.subscribe(eventName, _callback);
		});
		return this;
	};
	_Channel.prototype.listenOnce = function (_event, _callback) {
		var that = this;
		if (! (_event instanceof Array)) { _event = [_event]; }
		_event.forEach((e) => {
			let eventName = _normalzeEventName.call(that, e);
			let handle = PubSub.subscribe(eventName, (_data) => {
				_callback(_data);
				PubSub.unsubscribe(handle);
			});
		});
		return this;
	};
	_Channel.prototype.sayOnce = function (_event, _data) {
		let eventName = _normalzeEventName.call(this, _event);
		loopChecker(eventName);
		rememberEvent(eventName);
		PubSub.publish(eventName, _data);
		return this;
	};
	_Channel.prototype.get = function (_event) {
		let eventName = _normalzeEventName.call(this, _event);
		return eventData[eventName]();
	};
	_Channel.prototype.send = function (_event, _callback) {
		let eventName = _normalzeEventName.call(this, _event);
		eventData[eventName] = _callback;
		return this;
	};
		
	var comms =  {
		on: (_event, _callback) => {
			_callback = _callback || function () {};
			PubSub.subscribe(_event, _callback);
		},	
		trigger: (_event, _data) => {
			PubSub.publish(_event, _data);
		},		
		say: (_event, _data) =>  {
			loopChecker(_event);
			comms.trigger(_event, _data);
		},	
		listen: (_event, _callback) => {
			if (! (_event instanceof Array)) { _event = [_event]; }
			_event.forEach(function (e) {
				if (e in calledOnceEvents) {
					_callback();
					return true;
				}
				comms.on(e, _callback);
			});
		},
		sayOnce: (_event, _data) => {
			loopChecker(_event);
			rememberEvent(_event, _data);
			comms.trigger(_event, _data);
		},
		Channel: _Channel
	};
	
	return comms;
});