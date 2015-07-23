'use strict';

var Filter =  function(type, frequency) {
  Effect.apply();
  var filter  = self.getContext().createBiquadFilter();
  filter.type = type;
  filter.frequency = frequency;

  self.connect = function(node) {
    filter.connect(node);
  };
};