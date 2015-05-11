$(function(){
  var baseDir = '../assets/'
  var sampleFiles = [baseDir + "kick.wav",
                      baseDir + "snare.wav",
                      baseDir + "hat.wav"];
  var sampleBuffers = [];

  console.log("Loading Audio Envirinomet")
  window.AudioEnvironment = function(){};
  window.AudioEnvironment.context = new (window.AudioContext || window.webkitAudioContext)();

  if (!window.AudioEnvironment.context.createGain)
    window.AudioEnvironment.context.createGain = context.createGainNode;
  if (!window.AudioEnvironment.context.createDelay)
    window.AudioEnvironment.context.createDelay = context.createDelayNode;
  if (!window.AudioEnvironment.context.createScriptProcessor)
    window.AudioEnvironment.context.createScriptProcessor = context.createJavaScriptNode;

  function loadSampleFiles() {
    for (var i = sampleFiles.length - 1; i >= 0; i--) {
      loadSampleFile(sampleFiles[i]);
    };
  }

  function loadSampleFile(file) {
    var request = new XMLHttpRequest();
    request.open("GET",file,true);
    request.responseType = "arraybuffer";
    request.onload = function() {
      window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
          console.log(buffer);
          sampleBuffers.push(buffer);
        });
      };
    request.send();
  }

  loadSampleFiles();
});

