$(function(){
  var sampleFiles   = [ window.FileUtils.fileLocation("kick.wav"),
                        window.FileUtils.fileLocation("snare.wav"),
                        window.FileUtils.fileLocation("hat.wav")];

  console.log("Loading Audio Environment")
  window.AudioEnvironment = function(){};
  window.AudioEnvironment.context = new (window.AudioContext || window.webkitAudioContext)();

  if (!window.AudioEnvironment.context.createGain)
    window.AudioEnvironment.context.createGain = context.createGainNode;
  if (!window.AudioEnvironment.context.createDelay)
    window.AudioEnvironment.context.createDelay = context.createDelayNode;
  if (!window.AudioEnvironment.context.createScriptProcessor)
    window.AudioEnvironment.context.createScriptProcessor = context.createJavaScriptNode;

  window.AudioEnvironment.sampleBuffers = {};

  function setUpDrumMachineSamples() {
    for (var i = sampleFiles.length - 1; i >= 0; i--) {
      var sourceBufferNode  = window.AudioEnvironment.context.createBufferSource();
      window.AudioEnvironment.sampleBuffers[stripFileName(sampleFiles[i])] =
      window.AudioEnvironment.loadSampleFile(sampleFiles[i], sourceBufferNode);
    };
  }

  window.AudioEnvironment.loadSampleFile = function(file, sourceBufferNode) {
    var promise = new Promise(function(resolve, reject){
    var request = new XMLHttpRequest();
      request.open("GET", file, true);
      request.responseType = "arraybuffer";
      request.send();
      request.onload = function() {
        resolve(this.response);
        // window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
        //     // console.log("returning");
        //     // console.log( buffer);
        //     // sourceBufferNode.buffer = buffer;
        //     // sourceBufferNode.connect(window.AudioEnvironment.context.destination);
        //     // console.log(sourceBufferNode);
        //     resolve(buffer);
        //   });
        };
    });
    return promise;
  } 

  function stripFileName(file){
    return filename = file.split('/')[2].split('.')[0];
  }
 setUpDrumMachineSamples();
});
