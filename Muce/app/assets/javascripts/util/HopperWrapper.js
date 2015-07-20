function HopperWrapper () {
  var self = this;
  self.hopper = hopper; 

  self.processInput = function() {
    var input = $("#text-input").text();
    input = input.split('\n')
    input.forEach(function(string) {
      console.log(string);
      console.log(self.hopper.check(string).prelude.then());
    })
  }
}
