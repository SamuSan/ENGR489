function NextSequenceService (currentSequence, nextSequence) {
  var self = this;
  var currentSequence = currentSequence;
  var nextSequence = nextSequence;

  self.call = function() {
    nextSequenceWorker = new Worker("<%= javascript_path "nextSequenceWorker.js" %>");

    sequencerWorker.onmessage = function(e) {
      if(e.data == 'step') {
        // db(e.data);
        eventScheduler();
      }
      else {
        db('Received :' + e.data);
      }
    };
    sequencerWorker.postMessage({ "schedulingLookAhead": schedulingLookAhead });
  }
}

