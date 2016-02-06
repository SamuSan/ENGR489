function Test() {
  var self = this;
  var performance = null;

  self.startTest = function() {
    var syn  = new Synth('sine', "C-MAJ7");
    var synPart = new Part(syn, "QU");
    synPartTwo = new Part(syn, "SQ");
    var seq = new Sequencer([synPart]);
    var seq_two = new Sequencer([synPartTwo]);
    performance = new Performance(null, seq);
    performance.enqueue(seq_two);
    performance.nextSequence();
  }

  self.stopTest = function() {
    performance.stop();
    performance = null;
  }
}