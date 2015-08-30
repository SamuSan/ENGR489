$(function(){
  var started = false;
  var t = null;
  var hopperWrapper = null;

  $('#play-button').on('click', function(e){
    $('#play-button').addClass('disabled');
    var input = $('#text-area').val();
    hopperWrapper = new HopperWrapper();
    hopperWrapper.interpret(input);
    // t = new Test();
    // t.startTest();
  });

    $('#stop-button').on('click', function(e){
      $.get('performance/stop_performance')
      // $('#play-button').removeClass('disabled');
      hopperWrapper.terminate();
      // t.stopTest();
  });
});
