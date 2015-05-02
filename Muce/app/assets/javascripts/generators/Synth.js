'use strict';

var Synth = function (waveform, chord) {
  Instrument.apply(this, arguments);
  var self = this;
  var oscillators = [];
  var notes = HarmonyUtil.chordFromName(chord);




  self.play = function (){
    notes.forEach(function(note){
      oscillators.push(new Osc(self.getContext(), waveform, note))
    });
    oscillators.forEach(function(osc){
      osc.play(0);
    });
  }

  self.stop = function () {
    oscillators.forEach(function(osc){
      osc.shhh(0);
    });
  }
}











// function Synth(){
//   var self = this;
//   Instrument.apply(this, arguments);

//   self.play = function(){
    
//   }
// }