$(function(){
  var inputs  = [
    "var s := Synth.name(\"Synth1\") mono(true) waveform(\"sine\")\n",
    "s.play\n",
    "var d := Synth.name(\"Synth1\") mono(false) waveform(\"sine\")\n",
    ]

  inputs.forEach(function(input){
    $('#text-input').append(input);
  });
})
