import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var nim = require( '../../../src/main.js');
var data = require('../../../src/data.js');
var gameSolver = require( '../../../src/game.js');

function Data(props){
  return <div>{props.arr.toString()}, { props.value}</div>;

}

function History(props){
    return (
        <div>
        {data.getWinningData().map(obj=>
            <Data 
              arr={obj.arr } 
              value={obj.value}
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
    console.log("arr");
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
          history={this.state.history}
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
