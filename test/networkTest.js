var expect = require("chai").expect;
var nim = require("../src/main.js");
var nimData = require("../src/data.js");
var savedNetwork = require("../src/savedNetwork.js");

var convnetjs = require('convnetjs');

var getPreLoadedNetwork = ()=>{

  var networkString = savedNetwork;
	// later, to recreate the network:
  var json = JSON.parse(networkString); // creates json object out of a string
  var net2 = new convnetjs.Net(); // create an empty network
  net2.fromJSON(json); // load all parameters from JSON
  return  net2;
  
}
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

describe("test of prediciting values", function(){
  it("should predict 0,2,2 as winning value", function(){
    var data = [0,2,2];
    var network = getPreLoadedNetwork();
    var result = nim.predictSet(data, network);
    expect(result.w['1']).to.be.above(1/2);    
  });

  it("should predict 1,2,2 as losing value", function(){
    var data = [1,2,2];
    var network = getPreLoadedNetwork();
    var result = nim.predictSet(data, network);
    expect(result.w['0']).to.be.above(1/2);    
  });
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
