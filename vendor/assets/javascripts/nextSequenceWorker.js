var self = this;
var intervalCallBackFunction = null;
var callBackFrequency = 1.0 / 44100.0; //default to 2ms
var tolerance = 0.00411186696900974;
var targetClockValue = null;

self.onmessage = function(e) {
  //We check for clock value first as an optimisation, this may not be the best idea
  if(e.data.currentClockValue){
    targetClockValue = e.data.targetClockValue;
    log_shit("Target: " + targetClockValue + " Current: " + e.data.currentClockValue);
    log_shit("Difference" + Math.abs(targetClockValue - e.data.currentClockValue));
    if(Math.abs(targetClockValue - e.data.currentClockValue) < tolerance){
      log_shit("changing")
      // postMessage("change")
    }
  }
  //Send the check message to get the current time position
  else if(e.data.run === true) {
    targetClockValue = e.data.targetClockValue;

    intervalCallBackFunction = setInterval(function() {
        postMessage("check");
      }, callBackFrequency);
  }
  //Reset the call back frequency, currently this is set to a single sample
  else if(e.data.callBackFrequency) {
    callBackFrequency = e.data.callBackFrequency;

    log_shit("callBackFrequency set to :" + callBackFrequency);

    //if intervalCallBackFunction then we are already running and this is changing timeout value
    if(intervalCallBackFunction) {
      clearInterval(intervalCallBackFunction);
      intervalCallBackFunction = setInterval(function() {
          postMessage("check");
        }, callBackFrequency);
    }
  }
  else if(e.data == "stop") {
    log_shit("stopping")
    clearInterval(intervalCallBackFunction);
    intervalCallBackFunction = null;
  }
}

function log_shit(argument) {
  console.log(argument);
}

postMessage("Sequencer Worker Initialised")
