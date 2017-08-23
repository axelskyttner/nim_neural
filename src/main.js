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
  layer_defs.push({type:'fc', num_neurons:10, activation:'relu'});


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
  var losingMoves4 = [];
  for(var i = 2; i < 10;i++){
    var obj = {
      arr: [0,0,i],
      value: losingValue
    }
    losingMoves1.push(obj); 
  }
  for(var i = 5; i < 20;i = i + 2){
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
  for(var i = 6; i < 10;i++){
    var obj = {
      arr: [1,4,i],
      value: losingValue
    }
    losingMoves4.push(obj); 
  }

  var losingSet = [ ].concat(losingMoves1).concat(losingMoves2).concat(losingMoves3).concat(losingMoves4);
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
  for(var i = 2; i< 20; i = i + 2){
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
  var winningSet = [ obj ].concat(winningMoves2).concat(winningMoves2);

  return winningSet;

}


var trainDataSet = (trainer, dataSet )=>{

  dataSet.map(obj=>{
    var arr = obj.arr;
    var vol = new convnetjs.Vol(arr);
    var value = obj.value;
    return {vol:vol, value:value};
  }).
  forEach(obj=>{
    var stats = trainer.train(obj.vol,obj.value);
  });

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
    method: 'adadelta',
    l2_decay:0.001
  });
  return trainer;

}

var predictDataSet = (arr,net)=>{
  return arr.map(obj=>{
    
    var valueArr = obj.arr; 
    return new convnetjs.Vol(valueArr);
  }).map(x=>{
    var res = net.forward(x);
    return net.forward(x);
  });
}

var predictSet = (arr, net) =>{
  var x = new convnetjs.Vol(arr);
  return net.forward(x);

}


var allData = shuffleArray(generateData())
var sliceValue = -10;
var trainingData = allData.slice(0,sliceValue);
var testData  = allData.slice(sliceValue);
var winningSet = trainingData.filter(obj=>obj.value === winningValue);
var losingSet = trainingData.filter(obj=>obj.value === losingValue);

var toBeNetworks = [1,2,3,4,5,6,7,8,9,10];

var network = generateNet();
var trainer = generateTrainer(network);
for(var i = 0; i < 100; i++){
   
  //trainer.train(y, 0);
  trainDataSet(trainer,trainingData); 

}




var exportObject = {
  predictDataSet: predictDataSet,
  predictSet: predictSet,
  winningData: winningSet,
  losingData: losingSet,
  testData, testData,
  trainingData, trainingData,
  generateNet: generateNet,
  network: network

};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = exportObject;
else{

  window.nim = exportObject;

}
