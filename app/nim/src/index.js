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

class NimBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'coconut',
      history: [[1,2,3]],
    
    };
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
    this.getHistory = this.getHistory.bind(this); 

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

  getHistory(){
    console.log("this.state.history",this.state.history );
    

    return this.state.history.map(arr=>(arr.join(",") + "-------------"));
  }

  render () {
   return  (
    <div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange}>
        
        </input>
        <input value="submit" type="submit">
        </input>



      </form>
      <div>
      {  this.getHistory()}        
     
      </div>

    </div>
    );

  }

}

class Board extends React.Component {
  constructor() {
    super();
    this.state= {
      squares: Array(9).fill(null),
      xIsNext:  true,
    };

  }

  handleClick(i) {

    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext,
    
    });

  }
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() =>this.handleClick(i)}
      />
      );
  }

  render() {
    const status = (this.state.xIsNext)? 'Next player: X' : 'Next player : 0';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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
        <div className="game-board">
          <Board />
        </div>
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
