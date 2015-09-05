function RhythmUtil() {
  var self = this;

  // self.ONEBAR   = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ];
  // self.TWOBAR   = self.ONEBAR.concat(self.ONEBAR);
  // self.FOURBAR  = self.TWOBAR.concat(self.TWOBAR);

  self.CR           = [ 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0 ];

  self.CR_OFF       = [ 0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0 ];

  self.QU           = [ 1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0 ];

  self.SQ           = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ];

  self.TWO_FOUR     = [ 0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0 ];

  self.ONE_THREE     = [ 1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0 ];

  self.FOUR_FOUR    = [ 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0 ];

  self.CLAVE        = [ 0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0 ];

  self.ONE_BAR_LOOP = [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

  self.TWO_BAR_LOOP = [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

  self.FOUR_BAR_LOOP = [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

  self.ROCK_BEAT_ONE  = {  "hat"   : [ 1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0],
                          "snare"  : [ 0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                          "kick"   : [ 1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1] };

  self.HOUSE_BEAT     = {   "hat"   : [ 0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,
                                        0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,
                                        0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,
                                        0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1 ],

                            "snare" : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                                        0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                                        0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0 ],

                            "kick"  : [ 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,
                                        1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,
                                        1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,
                                        1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0 ]};

  self.getRhythmConstant = function(rhythm){
    switch(rhythm){
      case "ONEBAR":
        return self.ONEBAR;
      case "TWOBAR":
        return self.TWOBAR;
      case "FOURBAR":
        return self.FOURBAR
      case "CR":
        return self.CR;
      case "CR_OFF":
        return self.CR_OFF;
      case "QU":
        return self.QU;
      case "SQ":
        return self.SQ;
      case "TWO_FOUR":
        return self.TWO_FOUR;
      case "ONE_THREE":
        return self.ONE_THREE;
      case "FOUR_FOUR":
        return self.FOUR_FOUR;
      case "CLAVE":
        return self.CLAVE;
      case "ONE_BAR_LOOP":
        return self.ONE_BAR_LOOP;
      case "TWO_BAR_LOOP":
        return self.TWO_BAR_LOOP;
      case "FOUR_BAR_LOOP":
        return self.FOUR_BAR_LOOP;
      case "ROCK_BEAT_ONE":
        return self.ROCK_BEAT_ONE;
      case "HOUSE_BEAT":
        return self.HOUSE_BEAT;
    }
  }
}