function LoopPlayer(name, filename) {
  var self = this;
  Instrument.apply(this, [name]);

  var file              = window.FileUtils.fileLocation(filename);
  var bufferSourceNode  = self.getContext().createBufferSource();
  // var sampleBuffer      = window.AudioEnvironment.loadSampleFile(file, bufferSourceNode);
  var sampleBuffer      = window.AudioEnvironment.sampleBuffers['hat'];



  self.sampleLength = function() {
    return sampleBuffer.duration();
  }

  self.play = function()  {
    console.log(sampleBuffer)
    if(sampleBuffer){
      sampleBuffer.start();
    }
  }
}