
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


  
});
