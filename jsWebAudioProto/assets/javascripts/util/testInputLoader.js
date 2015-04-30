$(function(){
  var inputs  = [
    "var s = Synth.type(SINE) pitch(440)\n"
    ]

  inputs.forEach(function(input){
    $('#text-input').append(input);
  });
})
