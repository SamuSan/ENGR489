function LoopPlayer(name, filename) {
  Instrument.apply(this, [name]);

  var sample = window.AudioEnvironment.loadSampleFiles(
              [window.FileUtils.fileLocation(filename)]);
}