function Lexer (inputText) {
  var inputText = inputText;

  Lexer.prototype.processInput = function() {
    inputText = inputText.split(' ');
    console.log(inputText);
  };
}