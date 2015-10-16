/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _babelRecorderJs = __webpack_require__(2);

	var server = 'https://vast-spire-1103.herokuapp.com';

	var VoiceChat = (function () {
	  function VoiceChat(event) {
	    _classCallCheck(this, VoiceChat);

	    this.startUserMedia = this.startUserMedia.bind(this);
	    this.getNewMessages = this.getNewMessages.bind(this);

	    this.attachEvents = this.attachEvents.bind(this);
	    this.startPolling = this.startPolling.bind(this);

	    this.getUserMedia();
	    this.attachEvents();
	    this.startPolling();
	    this.messages = {};
	  }

	  _createClass(VoiceChat, [{
	    key: 'attachEvents',
	    value: function attachEvents() {
	      var _this = this;
	      document.addEventListener('keydown', function () {
	        _this.recorder.record();
	      });
	      document.addEventListener('keyup', function () {
	        _this.recorder.stop();
	      });
	    }
	  }, {
	    key: 'startPolling',
	    value: function startPolling() {
	      setInterval(this.getNewMessages, 1000);
	    }
	  }, {
	    key: 'getNewMessages',
	    value: function getNewMessages() {
	      var _this = this;
	      var xhr = new XMLHttpRequest();
	      xhr.open('GET', server + '/api/msgs', true);
	      xhr.onreadystatechange = function (e) {
	        var now = Date.now();
	        if (xhr.readyState === 4) {
	          var response = JSON.parse(xhr.responseText);
	          for (var key in response) {
	            var item = response[key];
	            if (!_this.messages[item.id]) {
	              _this.messages[item.id] = item;
	              var time = Date.parse(item.time);

	              // do not play if older than 20 secs
	              if (now - time > 20000) {
	                return;
	              }
	              _this.playAudio(item.file);
	            }
	          }
	          response;
	          this.messages;
	        }
	      };
	      xhr.send();
	    }
	  }, {
	    key: 'playAudio',
	    value: function playAudio(audio) {
	      var url = audio;
	      var li = document.createElement('li');
	      var au = document.createElement('audio');
	      var hf = document.createElement('a');

	      au.controls = true;
	      au.src = url;
	      /*hf.href = url;
	      hf.download = 'audio_recording_' + new Date().getTime() + '.mp3';
	      hf.innerHTML = hf.download;
	      li.appendChild(au);
	      li.appendChild(hf);
	      document.body.appendChild(li);*/
	      au.play();
	    }
	  }, {
	    key: 'getUserMedia',
	    value: function getUserMedia() {
	      navigator.getUserMedia({ audio: true }, this.startUserMedia, function (e) {
	        console.error('No live audio input: ' + e);
	      });
	    }
	  }, {
	    key: 'startUserMedia',
	    value: function startUserMedia(stream) {
	      this.recorder = new _babelRecorderJs.Recorder(stream);
	      console.log('Recorder initialised.');
	    }
	  }]);

	  return VoiceChat;
	})();

	document.addEventListener('DOMContentLoaded', function () {
	  try {
	    // webkit shim
	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	    window.URL = window.URL || window.webkitURL;
	    console.log('Audio context set up.');
	    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
	  } catch (e) {
	    console.error('No web audio support in this browser!');
	  }

	  var chat = new VoiceChat();

	  module['export'] = chat;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var server = 'https://vast-spire-1103.herokuapp.com';

	var Encoder = __webpack_require__(3);

	var context, audioInput, processor, gain, gainFunction, processorFunction, encoder, stream;
	var recording = false,
	    currCallback;

	var Recorder = (function () {
	  function Recorder(str) {
	    _classCallCheck(this, Recorder);

	    stream = str;
	    this.initEncoder();
	  }

	  _createClass(Recorder, [{
	    key: 'record',
	    value: function record() {
	      if (recording) {
	        return;
	      }
	      context = new AudioContext();
	      recording = true;

	      gainFunction = context.createGain || context.createGainNode;
	      gain = gainFunction.call(context);
	      audioInput = context.createMediaStreamSource(stream);
	      console.log('Media stream created.');
	      console.log('input sample rate ' + context.sampleRate);

	      audioInput.connect(gain);
	      console.log('Input connected to audio context destination.');

	      processorFunction = context.createScriptProcessor || context.createJavaScriptNode;
	      processor = processorFunction.call(context, 4096, 2, 2);

	      encoder.postMessage({
	        command: 'init',
	        sampleRate: context.sampleRate
	      });

	      processor.onaudioprocess = function (e) {
	        if (!recording) {
	          return;
	        }
	        encoder.postMessage({
	          command: 'record',
	          buffer: e.inputBuffer.getChannelData(0)
	        });
	      };
	      encoder.onmessage = function (e) {
	        var out = e.data;

	        var blob = new Blob([out.buffer], { type: 'audio/mpeg' });
	        //var url = URL.createObjectURL(blob);

	        sendViaAjax(blob);

	        /*var li = document.createElement('li');
	        var au = document.createElement('audio');
	        var hf = document.createElement('a');
	        au.controls = true;
	        au.src = url;
	        hf.href = url;
	        hf.download = new Date().toISOString() + '.mp3';
	        hf.innerHTML = hf.download;
	        li.appendChild(au);
	        li.appendChild(hf);
	        document.body.appendChild(li);*/
	        /*
	        var blob = e.data;
	        var mp3Name = encodeURIComponent('audio_recording_' + new Date().getTime() + '.mp3');
	        //uploadAudio(blob, mp3Name);
	        currCallback(blob, mp3Name);
	          var url = 'data:audio/mp3;base64,'+encode64(e.data.buf);
	        var li = document.createElement('li');
	        var au = document.createElement('audio');
	        var hf = document.createElement('a');
	          
	        au.controls = true;
	        au.src = url;
	        hf.href = url;
	        hf.download = 'audio_recording_' + new Date().getTime() + '.mp3';
	        hf.innerHTML = hf.download;
	        li.appendChild(au);
	        li.appendChild(hf);
	        document.body.appendChild(li);*/
	      };
	      gain.connect(processor);
	      processor.connect(context.destination);
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      recording = false;
	      this.exportMP3();
	    }
	  }, {
	    key: 'exportMP3',
	    value: function exportMP3(cb) {
	      //currCallback = cb;
	      //if (!currCallback) throw new Error('Callback not set');
	      encoder.postMessage({ command: 'exportMP3' });
	    }
	  }, {
	    key: 'initEncoder',
	    value: function initEncoder() {
	      // http://typedarray.org/from-microphone-to-wav-with-getusermedia-and-web-audio/
	      encoder = new Encoder();
	      console.log(encoder);
	    }
	  }]);

	  return Recorder;
	})();

	exports.Recorder = Recorder;

	function sendViaAjax(data) {
	  var url = server + '/api/msgs/';
	  var reader = new FileReader();
	  reader.onload = function (event) {
	    var fd = new FormData();
	    fd.append('owner', Math.random() + '.mp3');
	    fd.append('file', event.target.result);
	    var xhr = new XMLHttpRequest();
	    xhr.open('POST', url, true);
	    xhr.onreadystatechange = function () {
	      if (xhr.readyState == 4) {
	        console.log('MP3 Uploaded.');
	      }
	    };
	    xhr.send(fd);
	  };
	  reader.readAsDataURL(data);
	}
	function encode64(buffer) {
	  var binary = '',
	      bytes = new Uint8Array(buffer),
	      len = bytes.byteLength;

	  for (var i = 0; i < len; i++) {
	    binary += String.fromCharCode(bytes[i]);
	  }
	  return window.btoa(binary);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		return new Worker(__webpack_require__.p + "./hash.worker.js");
	};

/***/ }
/******/ ]);