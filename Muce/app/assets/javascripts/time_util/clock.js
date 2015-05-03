function Clock(context){
  var self = this;
  var context = window.AudioEnvironment.context;

  self.currentTime = function(){
    return context.currentTime;
  }
}
