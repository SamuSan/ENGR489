function HopperWrapper() {
  var self = this;
  var interpreter;

  hopper.prelude.then(function (prelude) {
    //// Synth ////
    var synth = hopper.runtime.object();

    synth.name_wave_chord = hopper.runtime.method("name() wave() chord()", [1, 1, 1],
      function (name, wave, chord) {
        return name[0].asPrimitiveString().then(function(name){
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

    //// DrumMachine ////
    var drumMachine = hopper.runtime.object();

    // drumMachine.name = hopper.runtime.method("name()", 1,
    //   function (name) {
    //     return name.asPrimitiveString().then(function (name) {
    //       return new DrumMachine(name);
    //     });
    //   });

    drumMachine.name = hopper.runtime.method("name()", 1,
      function (name) {
        return name.asPrimitiveString().then(function (name) {
          return new DrumMachine(name);
        });
      });

    prelude.DrumMachine = hopper.runtime.method("DrumMachine", 0, function(){
      return drumMachine;
    });


    //// LoopPlayer ////
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


    //// Performance ////
    var performance = hopper.runtime.object();

    performance.instrument_sequencer = hopper.runtime.method("instrument() sequencer()", [1, 1], 
      function(instrument, sequencer) {
        return new Performance(instrument, sequencer);
    });

    prelude.Performance = hopper.runtime.method("Performance", 0, function(){
      return performance;
    });

    //// Sequencer ////
    var sequencer = hopper.runtime.object();

    sequencer.parts = hopper.runtime.method("parts()", 1, 
      function(parts) {
        return parts.asPrimitiveArray().then(function(parts) {
          return new Sequencer(parts);
        });
    });

    prelude.Sequencer = hopper.runtime.method("Sequencer", 0, function() {
      return sequencer;
    });

    var part = hopper.runtime.object();

    part.instrument_rhythm = hopper.runtime.method("instrument() rhythm()", [1, 1], 
      function (instrument, rhythm) {
            return rhythm[0].asPrimitiveString().then(function (rhythm) {
              return new Part(instrument, rhythm);
            });
        });

    prelude.Part = hopper.runtime.method("Part", 0 , function() {
      return part;
    });
  });

  self.interpret = function(input) {
    var textInput = input;
    interpreter = new hopper.Interpreter();
    interpreter.enter(function(){
      interpreter.interpret(textInput, function(error){
        $("#error-div").text(error.toString());
        console.log(error.toString());
      });
    });
  }

  self.terminate = function(){
    interpreter.prelude.stop();
    interpreter = new hopper.Interpreter();
  }
}
