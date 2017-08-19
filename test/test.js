var expect = require("chai").expect;
var game = require("../src/main.js");

var meanValue = (arr)=>{
  
  var sum =  arr.reduce( (acc,val)=> val + acc, 0);
  return sum / arr.length;
}
var getMinValue = (arr)=>{
    return Math.min.apply(null, arr);
}
describe("test", function(){

  it("Should have a predicting function that works good on the winning elements", function(){
    var predictFunction = game.predictDataSet;
    var winningSet = game.winningSet;
    var results = predictFunction(winningSet);
    var minValue = getMinValue(results);
    expect(minValue).to.be.a.number;
  });
  it("Should have a predicting function that works good on the winning elements", function(){
    var predictFunction = game.predictDataSet;
    var winningSet = game.losingSet;
    var results = predictFunction(winningSet);
    var minValue = getMinValue(results);
    expect(minValue).to.be.a.number;
  });

//   it("Should have a predicting function that works good on the winning test elements", function(){
//    var result = game.result;
//    var predictFunction = game.predictDataSet;
//    var testDataSet = game.testWinningDataSet;
//    var results = predictFunction(testDataSet);
//    var minValue = getMinValue( results);
//    expect(minValue).to.be.above(0.5);
//   });
//   it("Should have a predicting function that works good on the test elements losing", function(){
//    var result = game.result;
//    var predictFunction = game.predictDataSet;
//    var testDataSet = game.testLosingDataSet;
//    var results = predictFunction(testDataSet);
//    var minValue = getMinValue( results);
//    expect(minValue).to.be.below(0.5);
//   });
});

describe("test of creating test data", function(){
  it("should have some test data", function(){
    var testData = game.generateWinningData();
    expect(testData.length).to.be.above(0);
  });
});

describe("test of layer generation",function(){

  it("should be able to create a net", function(){
    var layer = game.generateNet();
    expect(layer).to.exist;

  });
});


describe("test of creating test data", function(){
  it("should have some test data", function(){
    var testData = game.generateLosingData();
    expect(testData.length).to.be.above(0);
  });
});
