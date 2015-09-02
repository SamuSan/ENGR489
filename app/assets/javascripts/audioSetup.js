$(function(){
  var sampleFiles   = [ window.FileUtils.fileLocation("kick.wav"),
                        window.FileUtils.fileLocation("snare.wav"),
                        window.FileUtils.fileLocation("hat.wav")];
  var convolutionFiles = [ window.FileUtils.fileLocation("verb_impulse.wav") ];

  console.log("Loading Audio Envirinomet")
  window.AudioEnvironment = function(){};
  window.AudioEnvironment.context = new window.AudioContext();
  if(!window.AudioEnvironment.context){
    window.AudioEnvironment.context = new window.webkitAudioContext();
  }

  if (!window.AudioEnvironment.context.createGain)
    window.AudioEnvironment.context.createGain = context.createGainNode;
  if (!window.AudioEnvironment.context.createDelay)
    window.AudioEnvironment.context.createDelay = context.createDelayNode;
  if (!window.AudioEnvironment.context.createScriptProcessor)
    window.AudioEnvironment.context.createScriptProcessor = context.createJavaScriptNode;

  window.AudioEnvironment.sampleBuffers = {};

  function setUpDrumMachineSamples() { 
    for (var i = sampleFiles.length - 1; i >= 0; i--) {
      window.AudioEnvironment.sampleBuffers[stripFileName(sampleFiles[i])] = 
      window.AudioEnvironment.loadSampleFile(sampleFiles[i]);
    };
  }

  function loadConvolutionFiles(file){
    window.AudioEnvironment.loadSampleFile(file);
  }

  window.AudioEnvironment.loadSampleFile = function(file) {
    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
          var sampleBuffer    = window.AudioEnvironment.context.createBufferSource();
          sampleBuffer.buffer = buffer;
          window.AudioEnvironment.sampleBuffers[stripFileName(file)] = sampleBuffer;
          console.log(window.AudioEnvironment.sampleBuffers);
        });
      };
    request.send();
  }

  function stripFileName(file){
    return filename = file.split('/')[2].split('.')[0];
  }
 setUpDrumMachineSamples();
 loadConvolutionFiles(convolutionFiles[0]);
});