function Filter (settings) {
  var self = this;
  Effect.apply(self, [name]);
  var filter = self.getContext().createBiquadFilter();
  filter.frequency.value = settings["frequency"];
  filter.Q = settings["Q"];
  filter.type = settings["type"];


  self.setFrequency = function(frequency) {
    filter.frequency.value  = frequency;
  }

  self.setQ = function(Q) {
    filter.Q.value  = Q;
  }

  self.setType = function(type) {
    filter.type = type;
  }

  self.connect = function(node) {
    filter.connect(node);
  }
}
