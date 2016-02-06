var self = this;
var intervalCallBackFunction = null;
var callBackFrequency = 0.02; //default to 2ms

self.onmessage = function(e) {

  if(e.data == "run") {
    intervalCallBackFunction = setInterval(function() {
        postMessage("step");
      }, callBackFrequency);
  }
  else if(e.data.callBackFrequency) {
    callBackFrequency = e.data.callBackFrequency;

    console.log("callBackFrequency set to :" + callBackFrequency);

    //if intervalCallBackFunction then we are already running and this is changing timeout value
    if(intervalCallBackFunction) {
      clearInterval(intervalCallBackFunction);
      intervalCallBackFunction = setInterval(function() {
          postMessage("step");
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
