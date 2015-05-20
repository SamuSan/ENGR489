var Envelope = function(amplitude, context) {
  var self = this;

  var amplitude = amplitude;
  self.attackTime   = 0.1;
  self.sustainTime  = 0.1;
  self.releaseTime  = 0.1;
  var parma = null;

  self.connect = function(parmameter) { //Intentionally spelled wrong, I like ham.
    parma = parmameter;
  }

  self.trigger = function() { 
    var now = context.currentTime;
    parma.cancelScheduledValues(now);
    parma.setValueAtTime(0, now);
    parma.linearRampToValueAtTime(amplitude, now + self.attackTime);
    parma.linearRampToValueAtTime(0, now + self.sustainTime + self.releaseTime);
  }

}