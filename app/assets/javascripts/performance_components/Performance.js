function Performance(instrument, sequencer) {
  var self = this;

  window.AudioEnvironment.Performance = self;
  var sequences = [];
  var playingSequence;
  sequencer instanceof Sequencer ? playingSequence = sequencer : playingSequence = sequencer[0];

  if (instrument instanceof Synth) {
    var midi = window.AudioEnvironment.MidiController;
    midi.connectInstrument(instrument[0]);
  };

  if (playingSequence instanceof Sequencer){
    sequences.push(playingSequence);
    playingSequence.init();
    playingSequence.run();
  }

  function runSequence() {
    playingSequence.init();
    playingSequence.run();
  }
  //Add a sequencer to the collection of sequences for this performance
  //returns the index of the new sequencer
  self.enqueue = function(sequencer) {
    sequences.push(sequencer);
    return sequences.indexOf(sequencer);
  }
  //Play the next available sequence in the queues
  self.nextSequence = function() {
    //No next sequence do nothing, return false
    if(sequences.length === 1){ return false; }

    var nextSequenceService = new NextSequence(playingSequence, sequences[sequences.indexOf(playingSequence) + 1]);
    nextSequenceService.call();
    // //Stop current playing seq
    // playingSequence.stop();
    // //Start next sequence
    // playingSequence = sequences[sequences.indexOf(playingSequence) + 1];
    // runSequence();
    return true;
  }
  //Change to [index] sequence
  self.change = function(index, legato) {
    if(index < 0 || index >= sequences.length || index === undefined){ return false; }
    //Stop current playing seq
    playingSequence.stop();
    //Start next sequence
    playingSequence = sequences[index];
    runSequence();
    return true;
  }
  //Stop this performance and remove itself from the window context.
  self.stop  = function() {
    if(playingSequence instanceof Sequencer){
      playingSequence.stop();
    }
    window.AudioEnvironment.Performance = null;
  }
}