$(function(){
  var inputs  = [
    "var s = Synth()\n",
    "var x = Synth()\n"
    ]


  inputs.forEach(function(input){
    $('#text-input').append(input);
  });
})
