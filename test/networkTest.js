var expect = require("chai").expect;
var nim = require("../src/main.js");

describe("test of already functioning stuff", function(){

  it("should be able to predict a normal setup and have 2 output", function(){
    var network = nim.generateNet();
    var result = nim.predictSet([1,2,3], network);
    expect(result.w.length).to.equal(2);
  });
  it("should be able to predict a normal setup and no NaN",  function(){
    var network = nim.generateNet();
    var result = nim.predictSet([1,2,3], network);
    expect(result.w[0]).to.not.be.NaN;
  })

});

describe("test of decimal to binary functionality", function(){
  it("should make 32 return [0,0,0,0,1,0,0,0,0,0]", function(){
    var binaryValues = nim.decToBin([32]);
    expect(binaryValues[0][4]).to.equal(1);
    expect(binaryValues[0][0]).to.equal(0);
  });

  it("should make 8 return a array with lenght 10", function(){
    var binaryValues = nim.decToBin([8]);
    expect(binaryValues[0].length).to.equal(10);
  });

  it("should make 1000 to 10 length list ", function(){
    var binaryValues = nim.decToBin([1000]);
    expect(binaryValues[0].length).to.equal(10);


  });
});
