"use strict";

function Effect (name) {
  var self = this;
  var audioContext = window.AudioEnvironment.context;
  var name = arguments[0];

  self.getContext = function(){
    return audioContext;
  }

  self.name = function() {
    return name;
  }
}