$(function(){
  var started = false;
  var t=null;
  var hopperWrapper = null;

  // hopper.prelude.then(function (prelude) {
  //   var synth = hopper.runtime.object();

  //   synth.name_wave_chord = hopper.runtime.method("name() wave() chord()", [1, 1, 1],
  //     function (name, wave, chord) {
  //       return name[0].asPrimitiveString().then(function (name) {
  //         return wave[0].asPrimitiveString().then(function (wave) {
  //           return chord[0].asPrimitiveString().then(function (chord) {
  //             return new Synth(name, wave, chord);
  //           });
  //         });
  //       });
  //     });

  //   prelude.Synth = hopper.runtime.method("Synth", 0, function () {
  //     return synth;
  //   });
  //   prelude.Arranger = hopper.runtime.method("Arranger", 0, function(){

  //   })
  // });

  $('#play-button').on('click', function(e){
    console.log("gotta clicks");
    var input = $('#text-input').val();
    new HopperWrapper().interpret(input);

    // t = new Test();
    // t.startTest();
  });

    $('#stop-button').on('click', function(e){
    t.stopTest();
  });

  $(document).keypress(function(e){
    console.log("pressed " + e)
    if(e.which == 32 && !started) {
      started = !started;
      $('#play-button').click();
    }else {
      started = !started;
      $('#stop-button').click();
    }
  });

  window.onload  = function() {
    // $('#go-button').click();
  }
});
