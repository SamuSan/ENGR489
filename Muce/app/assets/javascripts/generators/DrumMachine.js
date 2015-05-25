function DrumMachine(name, beat) {
  var self = this;
  Instrument.apply(self, [name]);

  var hatSample   = window.AudioEnvironment.sampleBuffers['hat'];
  var snareSample = window.AudioEnvironment.sampleBuffers['snare'];
  var kickSample  = window.AudioEnvironment.sampleBuffers['kick'];

  var hat   = new Sampler('hat');
  var snare = new Sampler('snare');
  var kick  = new Sampler('kick');

  var rhythm = RhythmUtil.ROCK_BEAT_ONE;
}