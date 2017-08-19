if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){ 
  var convnetjs = require('convnetjs');

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
    var obj = {
      arr: [0,0,i],
      value: 0
    }
    losingMoves1.push(obj); 
  }
  for(var i = 5; i < 10;i++){
    var obj = {
      arr: [1,i,i+1],
      value: 0
    }
    losingMoves2.push(obj); 
  }

  var losingSet = [ ].concat(losingMoves1).concat(losingMoves2);
  return losingSet;
}

var generateWinningData = ()=>{

  var winningMoves1 = [];
  var winningMoves2 = [];
  for(var i = 2; i< 10; i++){

    var obj = {
      arr:[0,i,i],
      value: 0
    }
    winningMoves1.push(obj);
  }
  for(var i = 2; i< 10; i = i + 2){
    var obj = {
      arr:[1,i,i+1],
      value: 0
    }
    winningMoves2.push(obj);
  }
  var winningSet = [].concat(winningMoves1).concat(winningMoves2);

  return winningSet;

}


var trainDataSet = (trainer, dataSet , value)=>{

  dataSet.map(obj=>{
    var arr = obj.arr;
    var vol = new convnetjs.Vol(arr);
    return {vol:vol, value:obj.value};
  }).
  forEach(obj=>trainer.train(obj.vol,obj.value));

};

var generateTrainer = (net)=>{

  var trainer = new convnetjs.Trainer(net, {
    learning_rate:0.01, 
    l2_decay:0.01
  });
  return trainer;

}

var predictDataSet = (arr,net)=>{
  return arr.map(obj=>{
    
    var valueArr = obj.arr; 
    return new convnetjs.Vol(valueArr.sort());
  }).map(x=>{
    return net.forward(x).w[0];
  });
}

var net = generateNet();
var winningSet = generateWinningData();
var losingSet = generateLosingData();

var trainer = generateTrainer(net);



for(var i = 0; i < 100;i++){

  trainDataSet(trainer, winningSet, 0);
  trainDataSet(trainer, losingSet, 1);

}

var exportObject = {
  predictDataSet: predictDataSet,
  winningSet: winningSet,
  losingSet: losingSet,
  generateWinningData: generateWinningData,
  generateLosingData: generateLosingData,
  generateNet: generateNet

};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
module.exports = exportObject;
else{

  window.nim = exportObject;

}
