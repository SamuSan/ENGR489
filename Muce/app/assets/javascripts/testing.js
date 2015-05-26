function Test() {
  var self = this;
  var rhy  = new RhythmUtil();
  var seq  = new Sequencer();
  seq.init();

  self.startTest = function() {
    var parts = []
    var s = new Synth('s','square', 'C-Maj7');
    var e = new Synth('e','triangle', 'E-Min7');
    var f = new Synth('f','sine', 'A-Min7');

    var d = new DrumMachine('d');
    // parts.push(new Part(s, rhy.CR));
    // parts.push(new Part(e, rhy.SQ));
    // parts.push(new Part(f, rhy.QU));
    parts.push(new Part(d, rhy.ROCK_BEAT_ONE));
    parts = new Arranger(parts).arrange();
    seq.run(parts);
  }

  self.stopTest = function() {
    seq.stop();
  }
}