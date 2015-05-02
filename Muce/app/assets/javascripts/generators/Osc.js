'use strict'
function Osc (context, waveform, note) {
  //TODO this is actually waveform, a synth is one or more wavform osc
  var self = this;
  self.waveform = waveform;
  self.frequency = MIDIUtils.noteNumberToFrequency(note);
  var oscillator;


  self.play = function(first_argument) {
    oscillator = context.createOscillator();
    oscillator.frequency.value = self.frequency;
    oscillator.type = setWaveform();
    oscillator.connect(context.destination);
    oscillator.start(0);
  };

  self.shhh = function(first_argument) {
    oscillator.stop(0);
  };
  function setWaveform () {
    switch (self.waveform){
      case 'sine':
        return oscillator.SINE;
      case 'square':
        return oscillator.SQUARE;
      default :
        return oscillator.SINE;
    }
  }
}