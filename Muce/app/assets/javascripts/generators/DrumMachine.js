function DrumMachine(name, beat) {
  var self = this;
  Instrument.apply(self, arguments);

  var hat = window.AudioEnvironment.sampleBuffers['hat'];
  var snare = window.AudioEnvironment.sampleBuffers['snare'];
  var kick = window.AudioEnvironment.sampleBuffers['kick'];
}