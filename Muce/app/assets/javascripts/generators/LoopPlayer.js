function LoopPlayer(name, filename) {
  var self = this;
  Instrument.apply(this, [name]);

  var file              = window.FileUtils.fileLocation(filename);
  var sampleBuffer      = null;
  loadSampleFile(file);

  self.sampleLength = function() {
    return sampleBuffer.duration();
  }

  self.play = function()  {
    while(!loaded){
      console.log('waiting for load');
    }
    conole.log('playing');
    sampleBuffer.start();
  }

  loadSampleFile = function(file) {
    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
          sampleBuffer = buffer;
          console.log('loaded');
        });
      };
    request.send();
  }
}