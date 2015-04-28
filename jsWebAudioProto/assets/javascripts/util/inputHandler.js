function InputHandler () {
  InputHandler.prototype.handleInput = function(input) {
    new Lexer(input).processInput();
  };
}