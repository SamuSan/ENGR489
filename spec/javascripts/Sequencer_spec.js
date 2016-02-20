describe("Sequencer", function() {
  var syn;
  var synPart;
  var seq;
  var seq_two;
  var p;

  beforeEach(function() {
    syn  = new Synth('sine', "C-MAJ7");
    synPart = new Part(syn, "QU");
    seq = new Sequencer([synPart]);
    p = new Performance(null, seq);
  });

  it("reports its next loop point correctly", function() {
    expect(true).toEqual(false);
  });
});