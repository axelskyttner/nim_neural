if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){ 
  var convnetjs = require('convnetjs');

}

//0 is the label for losing and 1 is the label for winning
const losingValue = 0;
const winningValue = 1;

  
//this is the values [0,5,6], [0,7,8] which makes the 
// opponent give back 0,5,5
var losingMoves5 = ()=>{
  var arr = [];
  for(var i = 1; i < 10;i++){
    for(var j =i;j< 10;j++){


      arr.push([0,i,j]); 
    }
  }


  var newArr = arr.filter(arr=>{
    return arr[1] !== arr[2];

  });


  var returnArr = newArr.map(arr=>{
    return {arr:arr, value:losingValue}

  });


  return returnArr;

}

var losingMoves6 = ()=>{
  var arr = [];

  for(var i = 1; i < 10; i++){
    for(var j = 0; j < 10; j++){
      arr.push([i,i,j]);
      

    }


  }

  return arr.map(arr=>{

    return {arr:arr, value:losingValue};
  });

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
  for(var i = 5; i < 40;i = i + 2){
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

  var losingSet = [ ].concat(losingMoves1).concat(losingMoves2).concat(losingMoves2).concat(losingMoves2).concat(losingMoves3).concat(losingMoves4).concat(losingMoves5());
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



var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



var allData = shuffleArray(generateData())
var sliceValue = -10;

var getTrainingData = () =>{
  var trainingData = allData.slice(0,sliceValue);
  return trainingData;
}

var getTestData = () =>{
  var testData  = allData.slice(sliceValue);
  return testData;

}

var getWinningData = ()=>{
  var trainingData = getTrainingData(); 
  var winningSet = trainingData.filter(obj=>obj.value === winningValue);
  return winningSet;

}

var getLosingData = ()=>{
  var trainingData = getTrainingData();
  var losingSet = trainingData.filter(obj=>obj.value === losingValue);
  return losingSet;
}


var exportObject = {
  getWinningData: getWinningData,
  getTrainingData: getTrainingData,
  getTestData: getTestData,
  getLosingData: getLosingData,

};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = exportObject;
else{

  window.myData = exportObject;

}
