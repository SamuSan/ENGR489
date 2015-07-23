"use strict";

function Effect () {
  var self = this;
  var audioContext = window.AudioEnvironment.context;

  self.getContext = function(){
    return audioContext;
  }
}


