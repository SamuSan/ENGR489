$(function(){
  var started = false;
  var t = null;
  var hopperWrapper = null;

  $('#play-button').on('click', function(e){
    e.preventDefault();
    $("#error-div").text("");
    $('#play-button').addClass('disabled');
    $('#stop-button').removeClass('disabled');
    var input = $('#text-area').val();
    hopperWrapper = new HopperWrapper();
    hopperWrapper.interpret(input);
    // t = new Test();
    // t.startTest();
  });

  $('#stop-button').on('click', function(e){
    e.preventDefault();
    $('#play-button').removeClass('disabled');
    $('#stop-button').addClass('disabled');
    window.AudioEnvironment.Performance.stop();
  });

  $('#man-button').on('click', function(e){
    e.preventDefault();
    window.open("assets/gm_experimental_proceedure.pdf", '_blank');
    window.open("assets/gm_docs.pdf", '_blank');
  });

  $('#done-button').on('click', function(e){
    e.preventDefault();
    window.open("http://goo.gl/forms/pg63lYcKza", '_blank');
  });

  $('#noteoff-button').on('click', function(e){
    e.preventDefault();
    $("#error-div").text(window.AudioEnvironment.MidiController.toggleNoteOffThres());
  });
});
