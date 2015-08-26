"use strict";

function Instrument () {
  var self = this;
  var audioContext = window.AudioEnvironment.context;

  self.getContext = function(){
    return audioContext;
  }
}


