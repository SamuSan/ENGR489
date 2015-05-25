function LoopPlayer(name, filename) {
  var self = this;
  self.name = name;
  // Instrument.apply(self, [name]);
  var samplePlayer = new Sampler(name, filename);

  self.loop = function() {
    //TODO do something with this
  }

  self.play = function() {
    samplePlayer.play();
  }

  self.stop = function() {
    samplePlayer.stop();
  }

  self.syncWithTempo = function() {
    samplePlayer.syncWithTempo();
  }
}