import "Instrument" as Instrument
import "Oscillator" as Oscillator

class Synth.name(name) mono(polyphony) waveform(waveform') {
  var mono := polyphony
  var waveform := waveform'
  var oscillators := initialiseOscillators()

  method initialiseOscillators {
    if (mono) then {
      print ("mono")
      return "sauce"
    }
    else {
      print ("poly")
      return "suace"
    }
  }
}

var s := Synth.name("Synth1") mono(true) waveform("sine")
