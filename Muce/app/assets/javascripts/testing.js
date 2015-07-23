function Test() {
  var self = this;
  var rhy  = new RhythmUtil();
  var seq  = new Sequencer();
  seq.init();

  self.startTest = function() {
    var parts = []
    // var s = new Synth('s','square', 'C-Maj7');
    // var e = new Synth('e','triangle', 'E-Min7');
    var f = new Synth('f','triangle', 'A-Min7');

    var d = new DrumMachine('d');
    var l = new LoopPlayer('l', 'rh_samp_1.wav');
    var shk = new LoopPlayer('shk', '626 SHAKER.wav' );
    var tamb = new LoopPlayer('tamb', 'Alchemist Shaker 3.wav' );
    // var v = new LoopPlayer('v', 'single_sample.wav');
    // l.syncWithTempo();
    // parts.push(new Part(s, rhy.CR));
    // parts.push(new Part(e, rhy.SQ));
    parts.push(new Part(tamb, rhy.TWO_FOUR));
    parts.push(new Part(shk, rhy.CLAVE));
    // parts.push(new Part(d, rhy.ROCK_BEAT_ONE));
    parts.push(new Part(d, rhy.HOUSE_BEAT));
    // parts.push(new Part(v, rhy.TWO_BAR_LOOP));
    parts.push(new Part(l, rhy.FOUR_BAR_LOOP));
    parts = new Arranger(parts).arrange();
    seq.run(parts);
  }

  self.stopTest = function() {
    seq.stop();
  }
}