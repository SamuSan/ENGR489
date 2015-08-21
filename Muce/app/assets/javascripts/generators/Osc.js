'use strict'

function Osc (context, waveform, note) {
  var self = this;
  self.waveform   = waveform;
  self.frequency  = MIDIUtils.noteNumberToFrequency(note);
  var oscillator  = null;
  var chainTerminal = null;
  var gain        = null;
  var env         = null;
  var pan         = null;
  var panning     = 0;
  var GAIN_VALUE  = 0.05;

  self.init = function() {
    createVoice();
  }

//Live functions
  self.playNote = function() {
    self.init();
    oscillator.start();
  };

  self.stopNote = function() {
    oscillator.stop();
  };

//Loopbased functions
  self.play = function(startTime) {
    env.trigger();
    oscillator.start(startTime);
  };

  self.stop = function(endTime) {
    oscillator.stop(endTime);
  };

  self.connect = function(node) {
    chainTerminal.connect(node);
    chainTerminal = node;
  };

  self.chainTerminal = function() {
    return chainTerminal;
  }

  self.adjustPanning = function(panValue) {
    panning = panValue;
  }

  self.setADSR = function(settings) {
    env.set(settings);
  };

  function createVoice() {
    initOscillator();
    routeNodes();
  };

  function initOscillator() {
    oscillator = context.createOscillator();
    oscillator.frequency.value = self.frequency;
    oscillator.type = self.waveform;
  };

  function routeNodes() {
    gain = context.createGain();
    env  = new Envelope(GAIN_VALUE, context);
    pan  = context.createStereoPanner();

    pan.pan.value = panning;
    gain.value = GAIN_VALUE;

    oscillator.connect(gain);
    env.connect(gain.gain);
    gain.connect(pan);
    pan.connect(context.destination);
    chainTerminal = pan;
  };
}