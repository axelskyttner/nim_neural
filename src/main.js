var convnetjs = require('convnetjs');
var layer_defs = [];

// input layer of size 1x1x2 (all volumes are 3D)
layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:3});

// some fully connected layers
layer_defs.push({type:'fc', num_neurons:5, activation:'sigmoid'});

// a softmax classifier predicting probabilities for two classes: 0,1
layer_defs.push({type:'softmax', num_classes:2});
 
var net = new convnetjs.Net();
net.makeLayers(layer_defs);

var winningMoves1 = [];
for(var i = 0; i < 100;i++){
 winningMoves1.push([0,0,i]); 
}
var winningSet = [[1,0,0]];//, [2,2,0], [1,2,3], [1,4,5], [3,3,0], [4,4,0], [6,6,0] , [2,4,6]];
var losingSet = [[2,0,0]];//, [2,1,0] , [1,1,1], [3,0,0], [4,0,0],[5,0,0], [2,4,5], [3,4,5], [4,5,5], [5,5,10]];
var testWinningDataSet = [[1,4,5], [1,6,7]];
var testLosingDataSet = [[1,4,5], [1,6,7]];
// the network always works on Vol() elements. These are essentially
// simple wrappers around lists, but also contain gradients and dimensions
// line below will create a 1x1x2 volume and fill it with 0.5 and -1.3
 
var trainer = new convnetjs.Trainer(net, {learning_rate:0.1, l2_decay:0.001});
for(var i = 0; i < 1000;i++){

    winningSet.map(arr=>new convnetjs.Vol(arr)).forEach(convnet=>trainer.train(convnet,0));
    losingSet.map(arr=>new convnetjs.Vol(arr)).forEach(convnet=>trainer.train(convnet,1));

}
 

var predictDataSet = (arr)=>arr.map(arr=>new convnetjs.Vol(arr)).map(x=>net.forward(x).w[0]);

var result = predictDataSet(winningSet); 

module.exports = {
  predictDataSet: predictDataSet,
  winningSet: winningSet,
  losingSet: losingSet,
  testWinningDataSet: testWinningDataSet,
  testLosingDataSet: testLosingDataSet,
  result: result
  
}
