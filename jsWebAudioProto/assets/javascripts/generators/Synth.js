'use strict'
function Synth () {
  var oscillator;
  Synth.prototype.initiliase = function(first_argument) {
    var windowContext  = window.AudioEnvironment.context
    oscillator = windowContext.createOscillator();
    oscillator.frequency.value = 200;
    oscillator.connect(windowContext.destination);
  };

  Synth.prototype.play = function(first_argument) {
    oscillator.start(0);
  };
}