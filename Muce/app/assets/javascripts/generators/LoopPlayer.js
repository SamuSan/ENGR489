function LoopPlayer(name, filename) {
  Instrument.apply(this, [name]);
  var filePath = window.FileUtils.sampleDirPref;
  var sample = window.AudioEnvironment.loadSampleFiles([filePath + filename]);
}