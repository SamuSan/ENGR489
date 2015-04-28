window.DrumMachine = new function() {
  var SAMPLE_PATH = "./assets/audio/"
  var endLoop = 100;
  var playing = false;
  var sampler = {};
  var audioBuffers;
  var audioSources = [];
  var self = this;
  var startOffset = 0.0500;

  $(document).ready(function() {
    self.tempo = $("meta[property=projectTempo]").attr("content");
    self.beat        = 60 / parseFloat(self.tempo);
    self.semi        = self.beat / 4;
  });

  this.play = function() {
    playing = true;

    if (!audioBuffers) {
      loadSounds(cueBuffers)
    }
    else{
      cueBuffers();
    };
  };

  this.stopPlaying = function() {
    audioSources.forEach(function(source) {
      source.stop();
    });
    playing = false;
  };

  this.isPlaying = function() {
    return playing;
  };

  var cueBuffers = function(){
   var startTime = context.currentTime + startOffset;
     for (var i = 0; i < endLoop; i++) {
      time = startTime + (i * audioBuffers[0].duration) ;
      onCueBuffers(audioBuffers[0],time);
     };
  };

  var onCueBuffers = function(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    audioSources.push(source);
    // source.start(0);
    source[source.start ? 'start' : 'noteOn'](time);
  };

  var loadSounds = function(callback) {
    SamplerSetup.loadSounds(sampler, {
      sample_one:   SAMPLE_PATH + "loop_1.wav"
    }, function(){
        audioBuffers = [
          sampler.sample_one
        ];
      callback();      
    });
  };
};