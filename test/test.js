var expect = require("chai").expect;
var game = require("../src/main.js");

var meanValue = (arr)=>{
  
  var sum =  arr.reduce( (acc,obj)=> obj.val + acc, 0);
  return sum / arr.length;
}
var getMinValue = (arr)=>{
    return Math.min.apply(null, arr);
}
describe("test", function(){


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
