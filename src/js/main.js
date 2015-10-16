'use strict'

const server = 'https://vast-spire-1103.herokuapp.com'

import {Recorder} from 'babel!./recorder.js'

class VoiceChat {
  constructor(event) {
    this.startUserMedia = this.startUserMedia.bind(this)
    this.getNewMessages = this.getNewMessages.bind(this)

    this.attachEvents = this.attachEvents.bind(this)
    this.startPolling = this.startPolling.bind(this)

    this.getUserMedia()
    this.attachEvents()
    this.startPolling()
    this.messages = {};

  }
  attachEvents () {
    let _this = this
    document.addEventListener('keydown', function () {
      _this.recorder.record();
    })
    document.addEventListener('keyup', function () {
      _this.recorder.stop();
    })
  }
  startPolling () {
    setInterval(this.getNewMessages, 1000);
  }
  getNewMessages () {
    var _this = this
    var xhr = new XMLHttpRequest()
    xhr.open('GET', server + '/api/msgs', true)
    xhr.onreadystatechange = function (e) {
      var now = Date.now()
      if(xhr.readyState === 4) {
        var response = JSON.parse(xhr.responseText)
        for(var key in response) {
          var item = response[key]
          if(!_this.messages[item.id]) {
            _this.messages[item.id] = item
            var time = Date.parse(item.time)
            
            // do not play if older than 20 secs
            if(now - time > 20000) {
              return
            }
            _this.playAudio(item.file);
          }
        }
        response
        this.messages
      }
    }
    xhr.send()
  }
  playAudio (audio) {
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
  getUserMedia () {
    navigator.getUserMedia({audio: true}, this.startUserMedia, function(e) {
      console.error('No live audio input: ' + e);
    });
  }
  startUserMedia (stream) {
    this.recorder = new Recorder(stream);
    console.log('Recorder initialised.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = ( navigator.getUserMedia ||
                     navigator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia);
    window.URL = window.URL || window.webkitURL;
    console.log('Audio context set up.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    console.error('No web audio support in this browser!');
  }

  
  let chat = new VoiceChat()

  module.export = chat
})