var Envelope = function(amplitude, context) {
  var self = this;

  var amplitude = amplitude;
  var DEFAULT_ATTACK_SETTING  = 0.1;
  var DEFAULT_RELEASE_SETTING = 0.1;

  self.attackTime   = DEFAULT_ATTACK_SETTING;
  self.sustainTime  = 0.2;
  self.releaseTime  = DEFAULT_RELEASE_SETTING;
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

  self.set = function (settings) { // TODO ask are optionals and hash args ok in Grace
    if(settings['attack']){
      self.attackTime = settings['attack'];
    }
    if(settings['sustain']){
      self.sustainTime = settings['sustain'];
    }
    if(settings['release']){
      self.releaseTime = settings['release'];
    }
  }
}