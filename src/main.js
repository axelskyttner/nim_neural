if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){ 
  var convnetjs = require('convnetjs');

}

//0 is the label for losing and 1 is the label for winning
const losingValue = 0;
const winningValue = 1;

var generateNet = ()=>{

  var layer_defs = [];

  // input layer of size 1x1x2 (all volumes are 3D)
  layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:3});

  // some fully connected layers
  layer_defs.push({type:'fc', num_neurons:5, activation:'sigmoid'});
  layer_defs.push({type:'fc', num_neurons:5, activation:'sigmoid'});
  layer_defs.push({type:'fc', num_neurons:5, activation:'sigmoid'});

  // a softmax classifier predicting probabilities for two classes: 0,1
  layer_defs.push({type:'softmax', num_classes:2});

  var net = new convnetjs.Net();
  net.makeLayers(layer_defs);
  return net;

}


var generateLosingData = ()=>{
  var losingMoves1 = [];
  var losingMoves2 = [];
  var losingMoves3 = [];
  for(var i = 2; i < 10;i++){
    var obj = {
      arr: [0,0,i],
      value: losingValue
    }
    losingMoves1.push(obj); 
  }
  for(var i = 5; i < 10;i++){
    var obj = {
      arr: [1,i,i+1],
      value: losingValue
    }
    losingMoves2.push(obj); 
  }

  for(var i = 1; i < 10; i++){
    for(var j = 2; j < 10; j++){
      
      var obj = {
        arr: [i,j,j],
        value: losingValue
      }
      losingMoves3.push(obj);

    }

  }

  var losingSet = [ ].concat(losingMoves1).concat(losingMoves2).concat(losingMoves3);
  return losingSet;
}

var generateData = ()=>{
  var allData = generateWinningData().concat(generateLosingData());
  return allData;


}

var generateWinningData = ()=>{

  var winningMoves1 = [];
  var winningMoves2 = [];
  for(var i = 2; i< 15; i++){

    var obj = {
      arr:[0,i,i],
      value: winningValue
    }
    winningMoves1.push(obj);
  }
  for(var i = 2; i< 10; i = i + 2){
    var obj = {
      arr:[1,i,i+1],
      value: winningValue
    }
    winningMoves2.push(obj);
  }
  var obj = {
    arr: [2,4,6],
    value:winningValue

  }
  var winningSet = [obj ].concat(winningMoves1).concat(winningMoves2);

  return winningSet;

}


var trainDataSet = (trainer, dataSet )=>{

  dataSet.map(obj=>{
    var arr = obj.arr;
    var vol = new convnetjs.Vol(arr);
    return {vol:vol, value:obj.value};
  }).
  forEach(obj=>trainer.train(obj.vol,obj.value));

};

var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var generateTrainer = (net)=>{

  var trainer = new convnetjs.Trainer(net, {
    learning_rate:0.1, 
    l2_decay:0.01
  });
  return trainer;

}

var predictDataSet = (arr,net, label)=>{
  return arr.map(obj=>{
    
    var valueArr = obj.arr; 
    return new convnetjs.Vol(valueArr.sort());
  }).map(x=>{
    return net.forward(x).w[label];
  });
}


var net = generateNet();
var allData = shuffleArray(generateData())
var trainingData = allData.slice(0,-4);
var testData  = allData.slice(-4);
var winningSet = trainingData.filter(obj=>obj.value === winningValue);
var losingSet = trainingData.filter(obj=>obj.value === losingValue);

var toBeNetworks = [1,2,3,4,5,6,7,8,9,10];

var networks = toBeNetworks.map(num=>generateNet());
networks.reduce(network=>{
  var trainer = generateTrainer(network);
  trainDataSet(trainer, winningSet);

  var results = predictDataSet(winningSet, network, 1);
  var resultsLosing = predictDataSet(losingSet, network, 0);
  var percent =   results.filter( val => val > 0.5).length;
  var percentLosing = resultsLosing.filter( val => val > 0.5).length;

  return network;
});


var exportObject = {
  predictDataSet: predictDataSet,
  winningData: winningSet,
  losingData: losingSet,
  testData, testData,
  generateNet: generateNet,
  networks: networks

};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = exportObject;
else{

  window.nim = exportObject;

}
