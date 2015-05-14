function Test() {
  var self = this;
  var rhy  = new RhythmUtil();
  var seq  = new Sequencer();
  seq.init();

  self.startTest = function() {
    var parts = []
    var s = new Synth('s','sine', 'C-Maj7');
    var d = new DrumMachine('d');
    parts.push(new Part(s, rhy.CR))
    seq.run(parts);
  }

  self.stopTest = function() {
    seq.stop();
  }
}