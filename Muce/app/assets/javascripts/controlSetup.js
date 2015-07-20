$(function(){
  var started = false;
  var t=null;
  var hopperWrapper = null;

  $('#play-button').on('click', function(e){
    // console.log("gotta clicks");
    // hopperWrapper  = new HopperWrapper();
    // hopperWrapper.processInput();
    t = new Test();
    t.startTest();
  });

    $('#stop-button').on('click', function(e){
    t.stopTest();
  });

  $(document).keypress(function(e){
    console.log("pressed " + e)
    if(e.which == 32 && !started) {
      started = !started;
      $('#play-button').click();
    }else {
      started = !started;
      $('#stop-button').click();
    }
  });

  window.onload  = function() {
    // $('#go-button').click();
  }
});
