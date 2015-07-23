'use strict';

var Synth = function(name, waveform, chordShape) {
  var self = this;
  Instrument.apply(self, [name]);

  var oscWaveform = waveform;
  var oscillators = [];
  var gains       = [];
  var chord       = chordShape;
  var notes       = HarmonyUtil.chordFromName(chord);
  var oscPanValue = 0;

  self.play = function(startTime, endTime) { //TODO reconsider this naming, couldbe called schedule gets called by play
    self.createOsc();
    oscillators.forEach(function(osc) {
      osc.adjustPanning(oscPanValue);
      osc.play(startTime);
      osc.stop(endTime);
    });
  };

  self.stop = function(endTime) {
    oscillators.forEach(function(osc) {
      osc.stop(endTime);
    });
  };

  self.invertChord = function() {
    notes = HarmonyUtil.invertChord(notes);
  };

  self.setADSR = function(settings) {
    oscillators.forEach(function(osc) {
      osc.setADSR(settings); //TODO this aint gonna work the ENV gets killed everytine with the OSC
    });
  };

  self.pan = function(panValue) {
    oscPanValue = panValue;
  };

  Synth.prototype.createOsc = function() {
    oscillators = [];
    notes.forEach(function(note){
      oscillators.push(new Osc(self.getContext(), oscWaveform, note))
    });
  };
}