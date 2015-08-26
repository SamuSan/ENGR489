function Performance(instrument, sequencer) {
  var self = this;
  var seq = sequencer || null;
  var midi = window.AudioEnvironment.MidiController;
  midi.connectInstrument(instrument);
  if (seq){
    seq.init();
    seq.run();
  }
}