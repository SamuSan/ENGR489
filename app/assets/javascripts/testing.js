function Test() {
  var self = this;
  var rhy  = new RhythmUtil();
  var seq;
  // seq.init();

  var performance = null;

  self.startTest = function() {

    // var s = new Synth('s','sine')
    var parts = [];
    var x = new Synth('s','square');
    x.setEnvelopeRelease(5.0);
    // x.insertReverb();
        // var y = new Synth('s','square')
    var d = new DrumMachine('d');
    parts.push(new Part(d, rhy.ROCK_BEAT_ONE));
    seq = new Sequencer(parts);

    performance = new Performance(x);
    // var parts = []
    // // // var s = new Synth('s','square', 'C-Maj7');
    // // // var e = new Synth('e','triangle', 'E-Min7');
    // // var f = new Synth('f','sine', 'A#-Min7');
    // // f.pan(0.0);
    // var d = new DrumMachine('d');
    // // // var l = new LoopPlayer('l', 'testes_loop_1.wav');
    // // // l.syncWithTempo();
    // // // parts.push(new Part(s, rhy.CR));
    // // // parts.push(new Part(e, rhy.SQ));
    // // parts.push(new Part(f, rhy.CLAVE));
    // parts.push(new Part(d, rhy.ROCK_BEAT_ONE));
    // // // parts.push(new Part(l, rhy.ONE_BAR_LOOP));
    // parts = new Arranger(parts).arrange();
    // seq.run(parts);
  }

  self.stopTest = function() {
    seq.stop();
    performance = null;
  }
}