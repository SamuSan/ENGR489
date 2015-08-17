$(function(){
  var inputs  = [
    "def s = Synth.name(\"Bob\") wave(\"sine\") chord(\"C-Maj7\")\n",
    "def d = DrumMachine.name(\"d\")",
    ]

  inputs.forEach(function(input){
    $('#text-input').append(input);
  });
})
