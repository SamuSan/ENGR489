function Performance(synthesiser) {
  var self = this;
  var midi = window.AudioEnvironment.MidiController;
  midi.connectInstrument(synthesiser);
}