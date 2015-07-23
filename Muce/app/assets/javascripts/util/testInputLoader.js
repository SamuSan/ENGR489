$(function(){
  var inputs  = [

      "def rhy = Rhythm\n\n",
      "def syn = Synth.name(\"Synful\") type(\"triangle\").play(rhy.QU)\n",
      "def d = DrumMachine.name(\"Gerald\").play(rhy.HOUSE_BEAT)\n",
      "def r = LoopPlayer.name(\"Rhodes\") sample(\"rh_samp_1.wav\").play(rhy.FOUR_BAR_LOOP)\n",
      "def shk = LoopPlayer.name(\"Shaker\") sample(\"626Shaker 3.wav\").play(rhy.CLAVE)\n",
      "def tmb = LoopPlayer.name(\"Shaker\") sample(\"626Shaker 3.wav\").play(rhy.TWO_FOUR)\n\n",
      "def seq = Sequencer.gens([syn, d, r, shk, tmb, seq]).run()\n"
    ]

  inputs.forEach(function(input){
    $('#text-input').append(input);
  });
})
