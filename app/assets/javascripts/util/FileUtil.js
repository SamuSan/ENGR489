window.FileUtils = new function () {
  var self = this;
  var sampleDir = '../assets/';

  self.fileLocation = function(filename) {
    return sampleDir + filename;
  }
};
