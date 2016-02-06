var self = this;
var intervalCallBackFunction = null;
var callBackFrequency = 1.0 / 44100.0; //default to 2ms
var targetClockValue = null;

self.onmessage = function(e) {
  //We check for clock value first as an optimisation, this may not be the best idea
  if(e.data.currentClockValue){
    
  }
  //Send the check message to get the current time position
  else if(e.data.run == "run") {
    targetClockValue = e.data.targetClockValue;

    intervalCallBackFunction = setInterval(function() {
        postMessage("check");
      }, callBackFrequency);
  }
  //Reset the call back frequency, currently this is set to a single sample
  else if(e.data.callBackFrequency) {
    callBackFrequency = e.data.callBackFrequency;

    console.log("callBackFrequency set to :" + callBackFrequency);

    //if intervalCallBackFunction then we are already running and this is changing timeout value
    if(intervalCallBackFunction) {
      clearInterval(intervalCallBackFunction);
      intervalCallBackFunction = setInterval(function() {
          postMessage("check");
        }, callBackFrequency);
    }
  }
  else if(e.data == "stop") {
    console.log("stopping")
    clearInterval(intervalCallBackFunction);
    intervalCallBackFunction = null;
  }
}

postMessage("Sequencer Worker Initialised")
