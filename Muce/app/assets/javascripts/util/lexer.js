function Lexer (inputText) {
  var self = this;
  var inputText = inputText;
  var output = [];

  self.processInput = function () {
    return inputText = inputText.split(' ');
  };

  function stripBraces(input){
    input.forEach(function(token){
      if(token === '('){
        console.log(token);
      }
    });
  }
}