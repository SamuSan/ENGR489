function Test() {
  var self = this;
  var rhy  = new RhythmUtil();
  var seq  = new Sequencer();
  seq.init();

  self.startTest = function() {
    var parts = []
    var s = new TestSynth('s','sine', 'C-Maj7');
    parts.push(new Part(s, rhy.QU))
    seq.run(parts);
  }
}