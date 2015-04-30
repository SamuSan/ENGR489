function InputHandler () {
  InputHandler.prototype.handleInput = function(input) {
    tokens =  new Lexer(input).processInput();
  };
}