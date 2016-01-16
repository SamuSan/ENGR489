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
  //Add a sequencer to the collection of sequences for this performance
  self.enqueue = function(sequencer) {
    console.log('Adding sequencer');
  }
  //Change to [index] sequence, if no index is provided change to the next in the queue
  self.change = function(index) {
    if(index){
      console.log('Switching to' + index);
    }
    else{
      console.log('Switching to next');
    }
  }
  //Stop this performance and removes itself from the window context.
  self.stop  = function() {
    if(seq instanceof Sequencer){
      seq.stop();
    }
    window.AudioEnvironment.Performance = null;
  }
}