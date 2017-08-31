import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var nim = require( '../../../src/main.js');
var data = require('../../../src/data.js');
var gameSolver = require( '../../../src/game.js');

function Data(props){
  return <div style={
    {"margin-bottom":10 + 'px',
  
    "background-color": getDivColor(props.expectedResult, props.predictedResult),
  }}> 
  Data: [{props.arr.toString()}] || 
  expectedResult:  {props.expectedResult} ||
  predictedResult:  {props.predictedResult} || 
  predictionData:  {props.prediction0}, {props.prediction1}
  
  </div>;

}

var getTrainingData = ()=>{

  return data.getTrainingData();
}


var getDivColor = (expectedResult, predictedResult)=>{

  return (expectedResult === predictedResult)? 'green' : 'red';
}

var createAndTrainNetwork = ()=>{
  var trainingData = getTrainingData();
  
  
  var network = nim.generateNet();
  var trainer = nim.generateTrainer(network);
  for(var i = 0; i < 10; i++){
     
    //trainer.train(y, 0);
    nim.trainDataSet(trainer, trainingData); 
  
  }

  return network;
}

var getResultString  = (val) =>{
  return (Math.round(val) === 1)? "winning" : "Losing";
  
}

var roundValue = (val)=>{
  return Math.round(val*100)/100;
}

var getPrediction = (arr, network, index)=>{
   
  return roundValue(nim.predictSet(arr, network).w[index]);

}

function History(props){
    return (
        <div>
        {props.data.map(obj=>
            <Data 
              arr={obj.arr} 
              value={obj.value}
              prediction0 = {getPrediction(obj.arr, props.network, 0)} 
              prediction1 = {getPrediction(obj.arr, props.network, 1)} 
              predictedResult = {getResultString(getPrediction(obj.arr, props.network, 1))}
              expectedResult = {getResultString(obj.value)}
              

          /> 
            )}
        </div>

    );

}

class NimBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'coconut',
      history: [[1,2,3]],
    
    };
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 

  }
  handleSubmit(event) {

    var arr = JSON.parse(this.state.value); 
    var copyHist = this.state.history.slice();
    copyHist.push(arr);
    copyHist.push(gameSolver.move(arr));
    this.setState({history: copyHist});
    event.preventDefault();

  }
  handleChange(event) {
    this.setState({value:event.target.value});
  }


  renderHistory(){

    return (
        <History 
          data={getTrainingData()} 
          network={createAndTrainNetwork()} 
        />
    );


  }


  render () {
   return  (
    <div>
      <h2> This is the data</h2>
      <div>
      {  this.renderHistory()}        
     
      </div>

    </div>
    );

  }

}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
          <NimBoard />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
