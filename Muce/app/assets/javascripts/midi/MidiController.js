function MidiController(midiConnection) {
  var self = this;
  var connection =  midiConnection;
  startLoggingMIDIInput(connection, null);
  var instrumentConnected = false;
  var instrument;

  self.connectInstrument = function(inst) {
    instrument = inst;
    instrumentConnected = true;
  }

  function onMIDIMessage( event ) {
    if(instrumentConnected){
      if(event.data[2] > 0){
          instrument.noteOn(event.data[1]);
      }
      else{
          instrument.noteOff(event.data[1]);
      }
    }
  }

  function startLoggingMIDIInput( connection, indexOfPort ) {
    connection.inputs.forEach( function(entry) {entry.onmidimessage = onMIDIMessage;});
  }

  function listInputsAndOutputs( midiAccess ) {
    for (var entry of midiAccess.inputs) {
      var input = entry[1];
      console.log( "Input port [type:'" + input.type + "'] id:'" + input.id +
        "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
        "' version:'" + input.version + "'" );
    }

    for (var entry of midiAccess.outputs) {
      var output = entry[1];
      console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
        "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
        "' version:'" + output.version + "'" );
    }
  }
}