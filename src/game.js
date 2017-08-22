if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){ 
  var convnetjs = require('convnetjs');

}

//0 is the label for losing and 1 is the label for winning
const losingValue = 0;
const winningValue = 1;

var move = (arr)=>{
  var validMoves = generateValidMoves(arr);
  console.log("validMoves", validMoves);
  return validMoves[0];
};

var generateValidMoves = (arr) =>{
  var validMoves = [];
  for(var i = 0; i < arr[0];i++){
    validMoves.push([i, arr[1], arr[2]]); 

  }
  for(var j = 0; j < arr[1]; j++){

    validMoves.push([arr[0], j, arr[2]]);
  }
  for(var k = 0; k < arr[1]; k++){

    validMoves.push([arr[0], arr[1], k]);
  }

  var allButZero = validMoves.filter(a=>sumArr(a) !== 0);
  return allButZero;
}

var sumArr = (arr)=>{

  return arr.reduce((acc, val)=>{
      return acc+ val;
  });
}


var exportObject = {
  move:move
};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = exportObject;
else{

  window.nim = exportObject;

}
