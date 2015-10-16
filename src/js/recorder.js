'use strict'
const server = 'https://vast-spire-1103.herokuapp.com'

var Encoder = require('worker!../worker/encoder')

var context, audioInput, processor, gain, gainFunction, processorFunction, encoder, stream;
var recording = false, currCallback;
    
export class Recorder {  
  constructor (str) {
    stream = str
    this.initEncoder()
  }
  record () {
    if(recording) {
      return
    } 
    context = new AudioContext;
    recording = true

    gainFunction = context.createGain || context.createGainNode;
    gain = gainFunction.call(context);
    audioInput = context.createMediaStreamSource(stream);
    console.log('Media stream created.' );
    console.log('input sample rate ' + context.sampleRate);

    audioInput.connect(gain);
    console.log('Input connected to audio context destination.');

    processorFunction = context.createScriptProcessor || context.createJavaScriptNode;
    processor = processorFunction.call(context, 4096, 2, 2);

    encoder.postMessage({
      command: 'init',
      sampleRate: context.sampleRate
    });

    processor.onaudioprocess = function(e){
      if (!recording) {
        return
      }
      encoder.postMessage({
        command: 'record',
        buffer: e.inputBuffer.getChannelData(0)
      });
    }
    encoder.onmessage = function(e){
      var out = e.data;

      var blob = new Blob([out.buffer], {type: 'audio/mpeg'});
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
    }
    gain.connect(processor);
    processor.connect(context.destination);
  }
  stop () {
    recording = false
    this.exportMP3()
  }
  exportMP3 (cb){
    //currCallback = cb;
    //if (!currCallback) throw new Error('Callback not set');
    encoder.postMessage({ command: 'exportMP3' });
  }
  initEncoder () {
    // http://typedarray.org/from-microphone-to-wav-with-getusermedia-and-web-audio/
    encoder = new Encoder
    console.log(encoder)
    
  }
}
function sendViaAjax (data) {
  let url = server + '/api/msgs/';
  let reader = new FileReader();
  reader.onload = function(event){
    let fd = new FormData();
    fd.append('owner', Math.random() + '.mp3');
    fd.append('file', event.target.result);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log('MP3 Uploaded.');
        }
    }
    xhr.send(fd);
  };
  reader.readAsDataURL(data);
}
function encode64(buffer) {
    var binary = '',
      bytes = new Uint8Array( buffer ),
      len = bytes.byteLength;

    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }