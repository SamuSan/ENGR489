'use strict'

function Osc (context, waveform, note) {
  var self = this;
  self.waveform   = waveform;
  self.frequency  = MIDIUtils.noteNumberToFrequency(note);
  var oscillator  = null;
  createOscillator();

  self.play = function(startTime, endTime) {
    createOscillator();
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
    oscillator = context.createOscillator();
    oscillator.frequency.value = self.frequency;
    oscillator.type = self.waveform;
  }
}