'use strict';

var Synth = function (waveform, chord) {
  Instrument.apply(this, arguments);
  var self = this;
  var oscWaveform = waveform;
  var oscillators = [];
  var notes = HarmonyUtil.chordFromName(chord);

  self.play = function (startTime){
    self.createOsc();
    oscillators.forEach(function(osc){
      osc.play(startTime);
    });
  }

  self.stop = function (endTime) {
    oscillators.forEach(function(osc){
      osc.shhh(endTime);
    });
  }

  Synth.prototype.createOsc = function() {
    notes.forEach(function(note){
      oscillators.push(new Osc(self.getContext(), oscWaveform, note))
    });
  }
}