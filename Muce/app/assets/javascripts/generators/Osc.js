'use strict'
function Osc (context, waveform, note) {
  var self = this;
  self.waveform = waveform;
  self.frequency = MIDIUtils.noteNumberToFrequency(note);
  var oscillator;


  self.play = function(startTime) {
    oscillator = createOscillator();
    oscillator.start(startTime);
  };

  self.shhh = function(endTime) {
    oscillator.stop(endTime);
  };

  function createOscillator() {
    var oscillator = context.createOscillator();
    oscillator.frequency.value = self.frequency;
    oscillator.type = self.waveform;
    oscillator.connect(context.destination);
    return oscillator;
  }
}