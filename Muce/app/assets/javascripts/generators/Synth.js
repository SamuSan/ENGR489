'use strict';

var Synth = function(name, waveform, chordShape) {

  Instrument.apply(this, arguments);
  var self = this;
  var name = name;
  var oscWaveform = waveform;
  var oscillators = [];
  var chord = chordShape;
  var notes = HarmonyUtil.chordFromName(chord);

  self.play = function(startTime, endTime) { //TODO reconsider this naming, couldbe called schedule gets called by play
    self.createOsc();
    oscillators.forEach(function(osc) {
      osc.play(startTime);
      osc.shhh(endTime);
    });
  }

  self.stop = function(endTime) {
    oscillators.forEach(function(osc) {
      osc.shhh(endTime);
    });
  }

  self.invertChord = function() {
    notes = HarmonyUtil.invertChord(notes);
  }

  Synth.prototype.createOsc = function() {
    oscillators = [];
    notes.forEach(function(note){
      oscillators.push(new Osc(self.getContext(), oscWaveform, note))
    });
  }
}