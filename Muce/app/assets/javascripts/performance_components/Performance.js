function Performance(instrument, sequencer) {
  var self = this;
  var seq = sequencer[0];
  var midi = window.AudioEnvironment.MidiController;
  midi.connectInstrument(instrument[0]);
  if (seq instanceof Sequencer){
    seq.init();
    seq.run();
  }
}