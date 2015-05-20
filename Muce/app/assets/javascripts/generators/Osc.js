'use strict'

function Osc (context, waveform, note) {
  var self = this;
  self.waveform   = waveform;
  self.frequency  = MIDIUtils.noteNumberToFrequency(note);
  var oscillator  = null;
  var gain        = null;
  var gainVal     = 0.3;

  self.play = function(startTime) {
    oscillator = createOscillator();
    oscillator.start(startTime);
  };

  self.shhh = function(endTime) {
    oscillator.stop(endTime);
  };

  self.connect = function(node) {
    oscillator.connect(node);
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

  function routeNodes() {
    gain = context.createGain();
    gain.value = gainVal;
    self.connect(gain);
    gain.connect(context.destination);
  }
}