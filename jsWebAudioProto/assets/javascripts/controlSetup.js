$(function(){
  $('#goButton').on('click', function(e){
    var input = $('#text-input').val();
    new InputHandler().handleInput($('#text-input').val());
  });
});
