'use strict'

function Osc (context, waveform, note) {
  var self = this;
  self.waveform   = waveform;
  self.frequency  = MIDIUtils.noteNumberToFrequency(note);
  var oscillator  = null;


  self.play = function(startTime, endTime) {
    oscillator = createOscillator();
    env.trigger();
    oscillator.start(startTime);
    oscillator.stop(endTime);
  };

  self.shhh = function(endTime) {
    oscillator.stop(endTime);
  };

  self.connect = function(node) {
    oscillator.connect(node);
  }



  function createOscillator() {
    initOscillator();

    return oscillator;
  }

  function initOscillator() {
    oscillator = context.createOscillator();
    oscillator.frequency.value = self.frequency;
    oscillator.type = self.waveform;
  }
}