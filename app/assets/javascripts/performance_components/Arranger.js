function Arranger(partsInput) {
  var self = this;
  var parts = partsInput;
  var partsOutput = [];

  self.arrange = function() {
    parts.forEach(function(part) {
      if(part.generator instanceof DrumMachine) {
        part.generator.drums().forEach(function(drum){
          partsOutput.push(new Part(drum, part.rhythm[drum.name()]))
        });
      }
      else {
        partsOutput.push(part);
      }
    });
    return partsOutput;
  }
}