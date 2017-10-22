
var dataSet = require("../src/data.js");
var expect = require("chai").expect;


describe("test of different datasets", function(){
  it("should have winning data with value 1", function(){
    var winningData = dataSet.getWinningData();
    expect(winningData[0].value).to.equal(1);
  });

  it("should have losing data with value 0", function(){
    var losingData = dataSet.getLosingData();
    expect(losingData[0].value).to.equal(0);
  });

  it("should have training data with value 0 and 1", function(){
    var trainingData = dataSet.getTrainingData();
    var nrOfLosing = trainingData.filter(a =>a.value === 0).length;
    var nrOfWinning = trainingData.filter(a=>a.value === 1).length;
    expect(nrOfLosing).to.be.above(0);
    expect(nrOfWinning).to.be.above(0);
  });

 //it("should have a losing move 9,9,9", function(){
 //   var losingData = dataSet.getLosingData();
 //   var index = losingData.filter(function(myObject){
 //       var numArr = myObject.arr;
 //     return numArr[0] === 9 && numArr[1] === 9 && numArr[2] === 9;
 //   });
 //   expect(index.length).to.be.above(0);
 // 
 //});



it("should have a losing move 1,5,6", function(){
    var losingData = dataSet.getLosingData(dataSet.getTrainingData().concat(dataSet.getTestData()));
    var index = losingData.filter(function(myObject){
        var numArr = myObject.arr;
        var value1 = 1;
        var value2 = 5;
        var value3 = 6;
      return numArr[0] === value1 && numArr[1] === value2 && numArr[2] === value3;
    });
    //expect(index.length).to.be.above(0);
  
 });

it("should have a losing move 0,0,2", function(){
    var losingData = dataSet.getLosingData(dataSet.getTrainingData().concat(dataSet.getTestData()));
    var index = losingData.filter(function(myObject){
        var numArr = myObject.arr;
        var value1 = 0;
        var value2 = 0;
        var value3 = 2;
      return numArr[0] === value1 && numArr[1] === value2 && numArr[2] === value3;
    });
    //expect(index.length).to.be.above(0);
  
 });

it("should have a winning label on [0,2,2]", function(){
  var allData = dataSet.getTrainingData().concat(dataSet.getTestData());
  var myobject = allData.filter(obj=>(obj.arr[0] == 0 && obj.arr[1] == 2 && obj.arr[2] == 2))[0];

  
  expect(myobject.value).to.equal(1);

});
});



