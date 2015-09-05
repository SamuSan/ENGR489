$(function(){
  var fileNames = ['kick', 'snare', 'hat', 'verb_impulse'];
  var sampleFiles   = [ window.FileUtils.fileLocation("kick"),
                        window.FileUtils.fileLocation("snare"),
                        window.FileUtils.fileLocation("hat")];
  var convolutionFiles = [ window.FileUtils.fileLocation("verb_impulse") ];

  console.log("Loading Audio Environment")
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
      window.AudioEnvironment.sampleBuffers[fileNames[i]] = 
      window.AudioEnvironment.loadSampleFile(sampleFiles[i], i);
    };
  }

  function loadConvolutionFiles(file){
    window.AudioEnvironment.loadSampleFile(file, 3);
  }

  window.AudioEnvironment.loadSampleFile = function(file, idx) {
    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
          var sampleBuffer    = window.AudioEnvironment.context.createBufferSource();
          sampleBuffer.buffer = buffer;
          window.AudioEnvironment.sampleBuffers[fileNames[idx]] = sampleBuffer;
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