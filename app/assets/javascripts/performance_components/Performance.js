function Performance(instrument, sequencer) {
  var self = this;
  window.AudioEnvironment.Performance = self;

  var seq = sequencer[0];
  var midi = window.AudioEnvironment.MidiController;
  midi.connectInstrument(instrument[0]);
  if (seq instanceof Sequencer){
    seq.init();
    seq.run();
  }

  self.stop  = function(){
    if(seq instanceof Sequencer){
      seq.stop();
    }
    window.AudioEnvironment.Performance = null;
  }
}