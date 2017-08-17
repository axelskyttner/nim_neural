var expect = require("chai").expect;
var game = require("../src/main.js");

var meanValue = (arr)=>{
  
  var sum =  arr.reduce( (acc,val)=> val + acc, 0);
  return sum / arr.length;
}
describe("test", function(){

  it("Should have a predicting function that works good on the winning elements", function(){
    var result = game.result;
    var predictFunction = game.predictDataSet;
    var winningSet = game.winningSet;
    var results = predictFunction(winningSet);
    console.log("results winning", results);
    var minValue = meanValue(results);
    expect(minValue).to.be.above(0.5);
  });
  it("Should have a predicting function that works good on the winning elements", function(){
    var result = game.result;
    var predictFunction = game.predictDataSet;
    var winningSet = game.losingSet;
    var results = predictFunction(winningSet);
    console.log("results losing", results);
    var minValue = meanValue(results);
    expect(minValue).to.be.below(0.5);
  });
  //it("Should have a predicting function that works good on the test elements", function(){
  //  var result = game.result;
  //  var predictFunction = game.predictDataSet;
  //  var testDataSet = game.testWinningDataSet;
  //  var results = predictFunction(testDataSet);
  //  var minValue = Math.min.apply(null, results);
  //  expect(minValue).to.be.above(0.5);
  //});
  //it("Should have a predicting function that works good on the test elements losing", function(){
  //  var result = game.result;
  //  var predictFunction = game.predictDataSet;
  //  var testDataSet = game.testLosingDataSet;
  //  var results = predictFunction(testDataSet);
  //  var minValue = Math.min.apply(null, results);
  //  expect(minValue).to.be.below(0.5);
  //});
});
