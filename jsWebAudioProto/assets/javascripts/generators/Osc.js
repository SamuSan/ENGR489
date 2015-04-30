'use strict'
function Osc (type) {
  //TODO this is actually waveform, a synth is one or more wavform osc
  var self = this;
  self.type = type;
  var oscillator;

  
//TODO this doesnt extend instrument
  self.initialise = function(context, frequency) {
    oscillator = context.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.type = setType();
    oscillator.connect(context.destination);
  };

  self.play = function(first_argument) {
    oscillator.start(0);
  };

  function setType () {
    switch (self.type){
      case 'sine':
        return oscillator.SINE;
      default :
        return oscillator.SINE;
    }
  }
}