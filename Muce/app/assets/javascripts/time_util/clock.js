function Clock(context){
  var self = this;
  var context = window.AudioEnvironment.context;
  var tempo = 120; // Classic default
  var minute = 60;
  var beat  = minute / tempo;

  self.currentTime = function(){
    return context.currentTime;
  }

  self.quarter = function(){
    return beat;
  }

  self.eigth = function(){
    return beat / 2 ;
  }

  self.sixteenth = function(){
    return beat / 4;
  }
}
