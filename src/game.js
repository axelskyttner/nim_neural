if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){ 
  var convnetjs = require('convnetjs');
  var neural = require("./main.js");

}
else {
  neural = nim;
}


var move = (arr)=>{
  var validMoves = generateValidMoves(arr);
  var results = validMoves.map((arr)=>{
    return neural.predictSet(arr, neural.network);
  });
  var bestIndex = results.reduce(function(bestIndex, res, index, array){
    if(res.w[1] > array[bestIndex].w[1]){
      return index;

    }
    else {
      return bestIndex;
    }
  }, 0);
  console.log("results", results);
  console.log("bestIndex", bestIndex);
  return validMoves[bestIndex];
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

  window.nimGame = exportObject;

}
