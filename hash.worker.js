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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	importScripts('../src/vendorjs/lame.min.js');

	var liblame = new lamejs(),
	    recLength = 0,
	    recBuffer = [],
	    sampleRate;

	self.onmessage = function (e) {
	  switch (e.data.command) {
	    case 'init':
	      init(e.data.sampleRate);
	      break;
	    case 'record':
	      record(e.data.buffer);
	      break;
	    case 'exportMP3':
	      exportMP3();
	      break;
	  }
	};

	function init(rate) {
	  sampleRate = rate;
	}

	function record(inputBuffer) {
	  recBuffer.push(inputBuffer);
	  recLength += inputBuffer.length;
	}

	function exportMP3() {
	  var audioData = mergeBuffers();
	  encodeMono(1, 44100, audioData);
	}

	function encodeMono(channels, sampleRate, samples) {
	  var mp3enc = new liblame.Mp3Encoder(channels, sampleRate, 128);

	  var out = new Int8Array(samples.length / 2);
	  var index = 0;
	  // mp3enc = new liblame.Mp3Encoder(channels, sampleRate, 128);
	  var remaining = samples.length;
	  var maxSamples = 1152;
	  for (var i = 0; remaining >= maxSamples; i += maxSamples) {
	    var mono = samples.subarray(i, i + maxSamples);
	    var mp3buf = mp3enc.encodeBuffer(mono);

	    if (mp3buf.length > 0) {
	      out.set(mp3buf, index);
	      index = index + mp3buf.length;
	    }
	    remaining -= maxSamples;
	  }
	  var mp3buf = mp3enc.flush(out.buffer);

	  self.postMessage(out, [out.buffer]);

	  console.log('done encoding');
	}

	function mergeBuffers() {
	  var result = new Int16Array(recLength),
	      offset = 0,
	      i = 0,
	      len = recBuffer.length;
	  var bfr = [];
	  for (; i < len; i++) {
	    for (var j = 0; j < recBuffer[i].length; j++) {

	      bfr[j] = recBuffer[i][j] * 5000;
	    }
	    result.set(bfr, offset);
	    offset += recBuffer[i].length;
	  }
	  recLength = 0;
	  recBuffer = [];
	  return result;
	}

/***/ }
/******/ ]);