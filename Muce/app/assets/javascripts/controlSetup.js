$(function(){
  var t=null;

  $('#go-button').on('click', function(e){
    t = new Test();
    t.startTest();
  });

    $('#stop-button').on('click', function(e){
    t.stopTest();
  });
});
