$(function(){
  var inputs  = [
    "def s = Synth.name(\"s\") wave(\"triangle\") chord(\"C-MAJ7\")\n",
    "s.setEnvelopeRelease(2.0)\n",
    "s.insert(\"reverb\")\n",
    "s.insert(\"distortion\")\n",

    "def dp = Part.instrument(s) rhythm(\"CR\")\n",
    // "def d = DrumMachine.name(\"rockbeat\")\n",
    // "def dp = Part.instrument(d) rhythm(\"ROCK_BEAT_ONE\")\n",

    "def seq = Sequencer.parts(dp)\n",

    "def p = Performance.instrument(s) sequencer(seq)\n",
    ]

  inputs.forEach(function(input){
    $('#text-area').append(input);
  });
})
