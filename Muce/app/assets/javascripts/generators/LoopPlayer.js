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

  self.syncWithTempo = function() {
    while(!loaded){console.log('waiting')};
    var clock = window.AudioEnvironment.Clock;
    var numberOfBeats = duration() / clock.beat();
    console.log("NOB" + numberOfBeats);
    console.log(16 / numberOfBeats);
    updatePlayRate(16 / numberOfBeats);
    numberOfBeats = duration() / clock.beat();
    console.log(duration() * self.sampleBuffer.playbackRate.value);
  }

  self.play = function() {
    if(loaded){
      if(playing){
        self.stop();
      }
      playing = !playing;
      assignBuffer();
      self.sampleBuffer.start();
      console.log('playing');
    }
  }

  self.stop = function() {
    if(playing){
      self.sampleBuffer.stop();
      playing = !playing;
    }
  }

  //Private
  function updatePlayRate(rate) {
    console.log("updating playbackrate" + rate);
    self.sampleBuffer.playbackRate.value = rate;
    console.log(self.sampleBuffer.playbackRate.value);
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