function HopperWrapper(){ 
  var self = this;

  hopper.prelude.then(function (prelude) {
    var synth = hopper.runtime.object();

    synth.name_wave_chord = hopper.runtime.method("name() wave() chord()", [1, 1, 1],
      function (name, wave, chord) {
        return name[0].asPrimitiveString().then(function (name) {
          return wave[0].asPrimitiveString().then(function (wave) {
            return chord[0].asPrimitiveString().then(function (chord) {
              return new Synth(name, wave, chord);
            });
          });
        });
      });

    prelude.Synth = hopper.runtime.method("Synth", 0, function () {
      return synth;
    });

  }).then(function(prelude) {
    var drumMachine = hopper.runtime.object();

    drumMachine.name = hopper.runtime.method("name()", [1],
      function (name) {
        return name[0].asPrimitiveString().then(function (name) {
          return new DrumMachine(name);
        });
      });

    prelude.DrumMachine = hopper.runtime.method("DrumMachine", 0, function(){
      return drumMachine;
    });
  });

  self.interpret = function(input) {
    hopper.interpret(input, function(error) {
      console.log(error.toString());
    });
  }
}
