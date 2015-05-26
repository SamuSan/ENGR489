'use strict';

var Synth = function(name, waveform, chordShape) {
  var self = this;
  Instrument.apply(self, [name]);

  var oscWaveform = waveform;
  var voices      = [];
  var chord       = chordShape;
  var notes       = HarmonyUtil.chordFromName(chord);
  init();

  self.play = function(startTime, endTime) { //TODO reconsider this naming, couldbe called schedule gets called by play
    voices.forEach(function(voice) {
      voice.trigger(startTime, endTime);
    });
  }

  // //TODO I dont think we need this now
  // self.stop = function(endTime) {
  //   oscillators.forEach(function(osc) {
  //     osc.shhh(endTime);
  //   });
  // }

  self.invertChord = function() {
    notes = HarmonyUtil.invertChord(notes);
  }

  self.setADSR = function(settings) {
    voices.forEach(function(voice) {
      voice.setADSR(settings); //TODO this aint gonna work the ENV gets killed everytine with the OSC
    })
  }

  function init() {
    notes.forEach(function(note){
      voices.push(new Voice(note, oscWaveform));
    });
  }

  function createOsc() {
    oscillators = [];
    notes.forEach(function(note){
      var osc = new Osc(self.getContext(), oscWaveform, note);
      routeNodes(osc);
      oscillators.push(new Osc(self.getContext(), oscWaveform, note));
    });
  }
}