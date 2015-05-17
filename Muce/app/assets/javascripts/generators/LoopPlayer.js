function LoopPlayer(name, filename) {
  Instrument.apply(this, [name]);

  var sampleBuffer = window.AudioEnvironment.loadSampleFile(
              [window.FileUtils.fileLocation(filename)]);

  self.sampleLength = function() {
    //length in seconds 
    return sampleBuffer.duration();
  }
}