if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){ 
  var convnetjs = require('convnetjs');
  var neural = require("./main.js");
  var data = require("./data.js");

}
else {
  neural = nim;
}



var getTrainingData = ()=>{

  return data.getTrainingData();
}



var createAndTrainNetwork = ()=>{
  var trainingData = getTrainingData();
  
  
  var network = neural.generateNet();
  var trainer = neural.generateTrainer(network);
  for(var i = 0; i < 100; i++){
     
    //trainer.train(y, 0);
    neural.trainDataSet(trainer, trainingData); 
  
  }

  return network;
}

var move = (arr)=>{
  var validMoves = generateValidMoves(arr);

  var network = createAndTrainNetwork();
  var results = validMoves.map((arr)=>{
    return neural.predictSet(arr, network);
  });
  var winningValue = 1;
  var bestIndex = results.reduce(function(bestIndex, res, index, array){
    if(res.w[winningValue] > array[bestIndex].w[winningValue]){
      return index;

    }
    else {
      return bestIndex;
    }
  }, 0);
  console.log("bestIndex", bestIndex);
  console.log("validMoves", validMoves);
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
  for(var k = 0; k < arr[2]; k++){

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
