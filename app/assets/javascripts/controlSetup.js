$(function(){
  var started = false;
  var t = null;
  var hopperWrapper = null;

  $('#play-button').on('click', function(e){
    $('#play-button').addClass('disabled');
    $('#stop-button').removeClass('disabled');
    var input = $('#text-area').val();
    hopperWrapper = new HopperWrapper();
    hopperWrapper.interpret(input);
    // t = new Test();
    // t.startTest();
  });

    $('#stop-button').on('click', function(e){
      $('#play-button').removeClass('disabled');
      $('#stop-button').addClass('disabled');
      window.AudioEnvironment.Performance.stop();
  });
});
