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

    var drumMachine = hopper.runtime.object();

    drumMachine.name = hopper.runtime.method("name()", 1,
      function (name) {
        return name.asPrimitiveString().then(function (name) {
          return new DrumMachine(name);
        });
      });

    prelude.DrumMachine = hopper.runtime.method("DrumMachine", 0, function(){
      return drumMachine;
    });

    var loopPlayer = hopper.runtime.object();

    loopPlayer.name_filename = hopper.runtime.method("name() filename()", [1, 1],
      function (name, filename) {
        return name[0].asPrimitiveString().then(function (name) {
          return filename[0].asPrimitiveString().then(function(filename) {
            return new LoopPlayer(name, filename);
          })
        });
      });

    prelude.LoopPlayer = hopper.runtime.method("LoopPlayer", 0, function(){
      return loopPlayer;
    });

    var performance = hopper.runtime.object();

    performance.instrument = hopper.runtime.method("instrument()", 1, 
      function(instrument) {
        return instrument.asPrimitiveString().then(function() {
          return new Performance(instrument);
        });
    });

    prelude.Performance = hopper.runtime.method("Performance", 0, function(){
      return performance;
    })
  });

  self.interpret = function(input) {
    hopper.interpret(input, function(error) {
      console.log(error.toString());
    });
  }
}
