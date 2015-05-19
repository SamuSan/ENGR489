function LoopPlayer(name, filename) {
  var self = this;
  Instrument.apply(this, [name]);

  var loaded       = false;
  var file         = window.FileUtils.fileLocation(filename);
  self.sampleBuffer = null;
  loadSampleFile(file);

  self.sampleLength = function() {
    return sampleBuffer.duration();
  }

  self.play = function()  {
    while(!loaded){
      console.log('waiting for load');
    }
    console.log('playing');
    self.sampleBuffer.start();
  }

  self.stop = function() {
    self.sampleBuffer.stop();
  }

  function loadSampleFile(file) {
    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
          self.sampleBuffer = self.getContext().createBufferSource();
          self.sampleBuffer.buffer = buffer;
          loaded = true;
          console.log('loaded');
        });
      };
    request.send();
  }
}