function Performance(instrument) {
  var self = this;
  var midi = window.AudioEnvironment.MidiController;
    midi.connectInstrument(instrument);
}