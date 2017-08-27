import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {

    return (
      <button className="square">

      </button>
      
      );

  }


}


class Board extends React.Component {
  renderSquare(i){

    return <Square />
  }



render() {
  const status = "Next player: X";

  return (
      <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)};
            {this.renderSquare(1)};
            {this.renderSquare(2)};
          </div>
      </div>

      );

      }

}

class Game extends React.Component {
  render() {

    return (
        <div classname="game">
          <div className="game-board">
            <board />
            </div>
            <div className="game-info">
              

            </div>
          </div>

        );
  }
}

// =====================00

ReactDOM.render(
    <game />,
    document.getElementById('root')
);

