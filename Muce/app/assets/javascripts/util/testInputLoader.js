$(function(){
  var inputs  = [
    "var s = Synth.mono_poly(poly) notes(CMAJ)\n"
    ]

  inputs.forEach(function(input){
    $('#text-input').append(input);
  });
})
