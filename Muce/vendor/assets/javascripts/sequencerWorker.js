var self = this;
var timeOutID = null;
var schedulingTimeOut = 50;

self.onmessage = function(e) {

  if(e.data == 'running') {
    timeOutID = setInterval(postMessage('step'), schedulingTimeOut);
  }
  else if(e.data.schedulingTimeOut) {
    schedulingTimeOut = e.data.schedulingTimeOut;

    console.log("SchedulingTimeOut set to :" + schedulingTimeOut);

    //if timeOutID then we are already running and this is changing timeout value
    if(timeOutID) {
      clearInterval(timeOutID);
      timeOutID = setInterval(postMessage('step'), schedulingTimeOut);
    }
  }
  else if(e.data == 'stop') {
    clearInterval(timeOutID);
    timeOutID = null;
  }
}

postMessage('Sequencer Worker Initialised')
