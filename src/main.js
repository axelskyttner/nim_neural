if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){ 
  var convnetjs = require('convnetjs');

}
else {
}

var generateNet = ()=>{

  var layer_defs = [];

  // input layer of size 1x1x2 (all volumes are 3D)
  layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:3});

  // some fully connected layers
  layer_defs.push({type:'fc', num_neurons:10, activation:'sigmoid'});
  layer_defs.push({type:'fc', num_neurons:10, activation:'sigmoid'});

  // a softmax classifier predicting probabilities for two classes: 0,1
  layer_defs.push({type:'softmax', num_classes:2});

  var net = new convnetjs.Net();
  net.makeLayers(layer_defs);
  return net;

}



var generateLosingData = ()=>{

  var losingMoves1 = [];
  var losingMoves2 = [];
  for(var i = 2; i < 10;i++){
    losingMoves1.push([0,0,i]); 
  }
  for(var i = 5; i < 10;i++){
    losingMoves2.push([1,i,i+1]); 
  }

  var losingSet = [ [2,1,0] , [1,1,1], [2,4,5], [3,4,5], [4,5,5], [5,5,10]].concat(losingMoves1).concat(losingMoves2);
  return losingSet;
}
// the network always works on Vol() elements. These are essentially
// simple wrappers around lists, but also contain gradients and dimensions
// line below will create a 1x1x2 volume and fill it with 0.5 and -1.3

var generateWinningData = ()=>{

  var winningMoves1 = [];
  var winningMoves2 = [];
  for(var i = 2; i< 10; i++){
    winningMoves1.push([0,i,i]);
  }
  for(var i = 2; i< 10; i = i + 2){
    winningMoves2.push([1,i,i+1]);
  }
  var winningSet = [].concat(winningMoves1).concat(winningMoves2);
  return winningSet;

}


var trainDataSet = (trainer, dataSet , value)=>{

  dataSet.map(arr=>{
    var vol = new convnetjs.Vol(1,1,3,0.0);
    vol.w[0] = arr[0];
    vol.w[1] = arr[1];
    vol.w[2] = arr[2];
    return vol;
  }).
  forEach(convnet=>trainer.train(convnet,value));

};

var generateTrainer = (net)=>{

var trainer = new convnetjs.Trainer(net, {
  learning_rate:0.01, 
  l2_decay:0.01
});
return trainer;

}

var predictDataSet = (arr)=>arr.map(arr=>new convnetjs.Vol(arr.sort())).map(x=>net.forward(x).w[0]);

var net = generateNet();
var winningSet = generateWinningData();
var losingSet = generateLosingData();

var testWinningDataSet = [[1,14,15],[1,12,13], [20,20,0], [0,500,500]];
var testLosingDataSet = [ [0,0,11],[1,2,2], [0,2,0], [0,500,0] ,[3,5,7]];
var trainer = generateTrainer(net);
for(var i = 0; i < 100;i++){

  trainDataSet(trainer, winningSet, 0);
  trainDataSet(trainer, losingSet, 1);

}

var result = predictDataSet(winningSet); 
var exportObject = {
  predictDataSet: predictDataSet,
  winningSet: winningSet,
  losingSet: losingSet,
  testWinningDataSet: testWinningDataSet,
  testLosingDataSet: testLosingDataSet,
  generateWinningData: generateWinningData,
  generateLosingData: generateLosingData,
  generateNet: generateNet,
  result: result

};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
module.exports = exportObject;
else{

  window.nim = exportObject;

}
