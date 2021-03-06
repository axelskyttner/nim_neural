var expect = require("chai").expect;
var neural = require("../src/main.js");
var game = require("../src/game.js");

var meanValue = (arr)=>{
  
  var sum =  arr.reduce( (acc,obj)=> obj.val + acc, 0);
  return sum / arr.length;
}
var getMinValue = (arr)=>{
    return Math.min.apply(null, arr);
}
describe("test of make move", function(){
  it("should give 0,0,1 when no other choise", function(){
      var res =  game.move([2,0,0]).sort(); 
      expect(res).to.deep.equal([0,0,1]);
  });

  it("should give 0,0,1 when given 0,0,3", function(){
      var res =  game.move([3,0,0]).sort(); 
      expect(res).to.deep.equal([0,0,1]);
  });

  it("should give 0,2,2 when given 2,2,2", function(){
      var res =  game.move([2,2,2]).sort(); 
      expect(res).to.deep.equal([0,2,2]);
  });

  it("should give 0,3,3 when given 3,3,3", function(){
      var res =  game.move([3,3,3]).sort(); 
      expect(res).to.deep.equal([0,3,3]);
  });

  it("should give 1,1,1 when given 1,1,3", function(){
      var res =  game.move([1,1,3]).sort(); 
      expect(res).to.deep.equal([1,1,1]);
  });

});

describe("test of creating test data", function(){
  it("should have some test data", function(){
    var testData = neural.winningData;
    expect(testData.length).to.be.above(0);
  });
});

describe("test of layer generation",function(){

  it("should be able to create a net", function(){
    var layer = neural.generateNet();
    expect(layer).to.exist;

  });
});


describe("test of creating test data", function(){
  it("should have some test data", function(){
    var testData = neural.losingData;
    expect(testData.length).to.be.above(0);
  });
});



