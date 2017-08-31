var expect = require("chai").expect;
var nim = require("../src/main.js");

describe("test of already functioning stuff", function(){

  it("should be able to predict a normal set", function(){
    var network = nim.generateNet();
    var result = nim.predictSet([1,2,3], network);
    expect(result.w.length).to.equal(2);
  });

});
