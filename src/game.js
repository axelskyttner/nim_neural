if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){ 
  var convnetjs = require('convnetjs');

}

//0 is the label for losing and 1 is the label for winning
const losingValue = 0;
const winningValue = 1;





var exportObject = {
  test:1
};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = exportObject;
else{

  window.nim = exportObject;

}
