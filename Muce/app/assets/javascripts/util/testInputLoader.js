$(function(){
  var inputs  = [
    "def s = Synth.type(\"sine\") chord(\"C-Maj7\")\n",
    "for(1..4) do { s.play }\n"
    ]

  inputs.forEach(function(input){
    $('#text-input').append(input);
  });
})
