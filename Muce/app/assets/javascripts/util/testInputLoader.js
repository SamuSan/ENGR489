$(function(){
  var inputs  = [
    "def s = Synth.name(\"Bob\") wave(\"sine\") chord(\"\")\n",
    "def p = Performance.instrument(s)\n",
    ]

  inputs.forEach(function(input){
    $('#text-input').append(input);
  });
})
