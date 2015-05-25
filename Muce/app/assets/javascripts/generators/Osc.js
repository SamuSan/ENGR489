'use strict'

function Osc (context, waveform, note) {
  var self = this;
  self.waveform   = waveform;
  self.frequency  = MIDIUtils.noteNumberToFrequency(note);
  var oscillator  = null;
  var GAIN_VALUE  = 0.3;

  self.play = function(startTime) {
    oscillator = createOscillator();
    env.trigger();
    oscillator.start(startTime);
  };

  self.shhh = function(endTime) {
    oscillator.stop(endTime);
  };

  self.connect = function(node) {
    oscillator.connect(node);
  }

  self.setADSR = function(settings) {
    env.set(settings);
  }

  function createOscillator() {
    initOscillator();
    routeNodes();
    return oscillator;
  }

  function initOscillator() {
    oscillator = context.createOscillator();
    oscillator.frequency.value = self.frequency;
    oscillator.type = self.waveform;
  }
}