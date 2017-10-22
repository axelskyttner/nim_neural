import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var nim = require( '../../../src/main.js');
var gameSolver = require( '../../../src/game.js');
function Square(props){
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function History(props){
    return (
        <div>
        {props.history.map(arr=><div>{arr.toString()}</div>)}
        </div>

    );

}

class NimBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //fix: remove value
      value: 'coconut',
      history: [[1,2,3]],
    
    };
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 

  }
  handleSubmit(event) {

    var arr = JSON.parse("[" + this.state.value + "]" ); 
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
    <h2> Write three numbers and see the response. It have to be three numbers divided by a ','</h2>
    <h4>You can try to write 2,4,6 for example</h4>
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange}>
        
        </input>
        <input value="submit" type="submit">
        </input>



      </form>
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
