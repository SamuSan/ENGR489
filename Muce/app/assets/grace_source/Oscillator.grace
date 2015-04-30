class Oscillator.wave(wave') {
  var wave := wave'

  method play (){
    return "playing"
  }
}

var o := Oscillator.wave("sine")
print (o.play())