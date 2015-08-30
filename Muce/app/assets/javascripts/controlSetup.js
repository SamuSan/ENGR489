$(function(){
  var started = false;
  var t = null;
  var hopperWrapper = null;

  $('#play-button').on('click', function(e){
    $('#play-button').addClass('disabled');
    var input = $('#text-area').val();
    new HopperWrapper().interpret(input);
    // t = new Test();
    // t.startTest();
  });

    $('#stop-button').on('click', function(e){
      $('#play-button').removeClass('disabled');
      // t.stopTest();
  });
});
