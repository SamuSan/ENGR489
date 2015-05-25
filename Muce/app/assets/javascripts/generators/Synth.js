'use strict';

var Synth = function(name, waveform, chordShape) {
  var self = this;
  Instrument.apply(self, [name]);

  var oscWaveform = waveform;
  var oscillators = [];
  var gains       = [];
  var envelopes   = [];
  var chord       = chordShape;
  var notes       = HarmonyUtil.chordFromName(chord);


  self.play = function(startTime, endTime) { //TODO reconsider this naming, couldbe called schedule gets called by play
    self.createOsc();
    oscillators.forEach(function(osc) {
      env.trigger();
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

  self.setADSR = function(settings) {
    oscillators.forEach(function(osc) {
      osc.setADSR(settings); //TODO this aint gonna work the ENV gets killed everytine with the OSC
    })
  }

  Synth.prototype.createOsc = function() {
    oscillators = [];
    notes.forEach(function(note){
      oscillators.push(new Osc(self.getContext(), oscWaveform, note))
    });
  }

  function routeNodes() {
    gain = context.createGain();
    env  = new Envelope(GAIN_VALUE, context);

    gain.value = GAIN_VALUE;
    self.connect(gain);
    env.connect(gain.gain);
    gain.connect(context.destination);
  }
}