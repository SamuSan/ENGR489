function DrumMachine(name, beat) {
  var self = this;
  Instrument.apply(self, [name]);

  var hat   = window.AudioEnvironment.sampleBuffers['hat'];
  var snare = window.AudioEnvironment.sampleBuffers['snare'];
  var kick  = window.AudioEnvironment.sampleBuffers['kick'];

  var rhythm = RhythmUtil.ROCK_BEAT_ONE;
}