'use strict';

var Synth = function(name, wave, chordShape) {
  var self = this;
  Instrument.apply(self, [name]);

  var oscWaveform   = wave;
  var voices        = [];
  var onNotes = {};
  // var filter        = new Filter("SynFilter", { "frequency" : 1000, "type" : 'highpass', "Q" : 100 });
  var chord         = chordShape || null;
  // var notes         = HarmonyUtil.chordFromName(chord);
  var oscPanValue   = 0;
  var voicePanValue = 0;
  // var voiceBuss     = self.getContext().createChannelMerger(notes.length);

  //Live play functions
  self.noteOn = function(noteNumber){
    var voice  = new Osc(self.getContext(), oscWaveform, noteNumber);
    voice.playNote();
    onNotes[noteNumber] = voice;
    console.log("playing:: " + noteNumber);
  } 

 self.noteOff = function(noteNumber){
    onNotes[noteNumber].stopNote();

    console.log(":stopping: " + noteNumber);
  }

  //Loop based functions
  self.play = function(startTime, endTime) { //TODO reconsider this naming, couldbe called schedule gets called by play
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

  self.setADSR = function(settings) {
    voices.forEach(function(voice) {
      voice.setADSR(settings); //TODO this aint gonna work the ENV gets killed everytine with the OSC
    });
  };

  self.pan = function(panValue) {
    oscPanValue = panValue;
  };

  Synth.prototype.createVoice = function() {
    voices = [];
    notes.forEach(function(note){
      voices.push(new Osc(self.getContext(), oscWaveform, note))
    });
    for (var i = 0; i < voices.length; i++) {
      voices[i].init();
      // voices[i].connect(voiceBuss, 0, i);
    };

    // voiceBuss.connect(self.getContext().destination);
    // Filter

  };
}
