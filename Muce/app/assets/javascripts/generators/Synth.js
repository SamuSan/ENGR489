'use strict';

var Synth = function(name, wave, chordShape) {
  var self = this;
  Instrument.apply(self, [name]);

  var oscWaveform     = wave;
  var voices          = [];
  var onNotes         = {};
  var filterSettings  = { "frequency" : 1000, "type" : 'highpass', "Q" : 10 };
  var envSettings     = { "A" : 0.05, "S" : 0.01, "R" : 0.1 };
  var verb;
  var chord           = chordShape || null;
  // var notes         = HarmonyUtil.chordFromName(chord);
  var oscPanValue     = 0;
  var voicePanValue   = 0;
  // var voiceBuss     = self.getContext().createChannelMerger(notes.length);

  //**** Live play functions ****//
  self.noteOn = function(noteNumber){
    var voice = new Osc(self.getContext(), oscWaveform, noteNumber);
    voice.init(envSettings);
    voice.connect(new Filter(filterSettings).filter);
    verb ? voice.connect(self.getContext().createConvolver()) : null;
    voice.playNote();
    onNotes[noteNumber] = voice;
  }

 self.noteOff = function(noteNumber){
    onNotes[noteNumber].stopNote();
  }

  //**** Loop based functions ****//
  self.play = function(startTime, endTime) { //TODO reconsider this naming, couldbe called schedule gets called by playing
    self.createVoice();
    voices.forEach(function(voice) {
      voice.adjustPanning(voicePanValue);
      voice.play(startTime);
      voice.stop(endTime);
    });
  };

  self.stop = function(endTime) {
    voices.forEach(function(voice) {
      voice.stop(endTime);
    });
  };

  self.invertChord = function() {
    notes = HarmonyUtil.invertChord(notes);
  };

  self.insertReverb = function() {
    voices.forEach(function(voice) {
      voice.connect(self.getContext().createConvolver()); //TODO this aint gonna work the ENV gets killed everytine with the OSC
    });
  };

  self.setEnvelope = function(settings) {
    envSettings = settings;
  };

  self.pan = function(panValue) {
    oscPanValue = panValue;
  };

  Synth.prototype.createVoice = function() {
    voices = [];
    notes.forEach(function(note){
      var voice = new Osc(self.getContext(), oscWaveform, note);
      voice.init();
      voices.push(voice)
    });
  };
}
