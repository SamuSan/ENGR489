'use strict';

var Synth = function (waveform, chord) {
  Instrument.apply(this, arguments);
  var self = this;
  var oscWaveform = waveform;
  var oscillators = [];
  var notes = HarmonyUtil.chordFromName(chord);

  self.play = function (){
    self.createOsc();
    oscillators.forEach(function(osc){
      osc.play(0);
    });
  }

  self.stop = function () {
    oscillators.forEach(function(osc){
      osc.shhh(0);
    });
  }

  Synth.prototype.createOsc = function() {
    notes.forEach(function(note){
      oscillators.push(new Osc(self.getContext(), oscWaveform, note))
    });
  }
}