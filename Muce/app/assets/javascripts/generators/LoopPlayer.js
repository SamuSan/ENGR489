function LoopPlayer(name, filename) {
  var self = this;
  Instrument.apply(this, [name]);

  var loaded        = false;
  var playing       = false;
  var file          = window.FileUtils.fileLocation(filename);
  var audioBuffer   = null;
  self.sampleBuffer = null;
  loadSampleFile(file);

  self.sampleLength = function() {
    return sampleBuffer.duration();
  }

  self.syncWithTempo = function(tempo) {
    var clock = window.AudioEnvironment.Clock;
    console.log(duration() / clock.beat());

  }

  self.play = function()  {
    if(loaded){
      playing = !playing;
      assignBuffer();
      self.sampleBuffer.start();
      console.log('playing');
    }
  }

  self.stop = function() {
    if(playing){
      self.sampleBuffer.stop();
    }
  }

  function duration() {
    return self.sampleBuffer.buffer.duration;
  }
  function loadSampleFile(file) {
    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
          audioBuffer = buffer;
          self.sampleBuffer = self.getContext().createBufferSource();
          self.sampleBuffer.buffer = audioBuffer;
          loaded = true;
          console.log('loaded');
        });
      };
    request.send();
  }

  function assignBuffer() { 
    self.sampleBuffer = self.getContext().createBufferSource();
    self.sampleBuffer.buffer = audioBuffer;
    self.sampleBuffer.connect(self.getContext().destination);
  }

  function cloneBuffer(buffer) {
    var clonedBuffer = $.extend(true, {}, buffer);
    return clonedBuffer
  }
}