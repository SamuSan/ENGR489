'use strict'

function Osc (context, waveform, note) {
  var self = this;
  self.waveform   = waveform;
  self.frequency  = MIDIUtils.noteNumberToFrequency(note);
  var oscillator  = createOscillator();


  self.play = function(startTime, endTime) {
    oscillator = createOscillator();
    oscillator.start(startTime);
    oscillator.stop(endTime);
  }

  self.shhh = function(endTime) {
    oscillator.stop(endTime);
  }

  self.connect = function(node) {
    oscillator.connect(node);
  }

  function createOscillator() {
    var oscillator = context.createOscillator();
    oscillator.frequency.value = self.frequency;
    oscillator.type = self.waveform;
    return oscillator;
  }
}