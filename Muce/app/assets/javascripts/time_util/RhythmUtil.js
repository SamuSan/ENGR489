function RhythmUtil() {
  var self = this;

  self.ONEBAR   = [1,1,1,1];
  self.TWOBAR   = self.ONEBAR.concat(self.ONEBAR);
  self.FOURBAR  = self.TWOBAR.concat(self.TWOBAR);

  self.CR   = [1,0,0,0]
  self.QU   = [1,0,1,0];
  self.SQU  = [1,1,1,1];
}