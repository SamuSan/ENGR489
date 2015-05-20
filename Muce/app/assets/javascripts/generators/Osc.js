'use strict'

function Osc (context, waveform, note) {
  var self = this;
  self.waveform   = waveform;
  self.frequency  = MIDIUtils.noteNumberToFrequency(note);
  var oscillator  = null;
  var gain        = null;
  var env         = null;
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
    env = new Envelope(GAIN_VALUE, context);

    gain.value = GAIN_VALUE;
    self.connect(gain);
    env.connect(gain.gain);
    gain.connect(context.destination);
  }
}