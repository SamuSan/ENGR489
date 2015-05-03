'use strict'
function Osc (context, waveform, note) {
  var self = this;
  self.waveform = waveform;
  self.frequency = MIDIUtils.noteNumberToFrequency(note);
  var oscillator;


  self.play = function(first_argument) {
    oscillator = createOscillator();
    oscillator.start(0);
  };

  self.shhh = function(first_argument) {
    oscillator.stop(0);
  };

  function createOscillator(){
    var oscillator = context.createOscillator();
    oscillator.frequency.value = self.frequency;
    oscillator.type = self.waveform;
    oscillator.connect(context.destination);
    return oscillator;
  }
}