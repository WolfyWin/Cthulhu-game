import React from 'react'
import { connect } from 'react-redux'
import { Board }from './Board'
import { calculateWinner } from "../store/actions/calculateWinner";
import { jumpTo,  makeMove } from "../store/actions/jumpTo";

class Game extends React.Component {
  handleClick(i) {
    const current = this.props.history[this.props.stepNumber];
    const squares = current.squares.slice();

    if (calculateWinner(squares).payload || squares[i]) {
      return;
    }
    this.props.makeMove(i);
  }

  render() {
    const squares = this.props.history[this.props.stepNumber].squares;
    const result = calculateWinner(squares).payload;

    const moves = this.props.history.map((step, move) => {
      const desc = move ? 'Tour #' + move : 'Mettre son âme en jeu';
      return (
        <li key={move}>
          <button onClick={() => this.props.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (result) {
      status = result.winner === 'X' ? 'Le Mortel a sauvé son âme !' : 'Le grand Cthulhu vous a englouti !';
    } else if (this.props.stepNumber === 9) {
      status = 'Match nul !';
    } else {
      status = (this.props.xIsNext ? 'Mortel' : 'Cthulhu') + ", à vous de jouer.";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeMove: (squares, xIsNext) => dispatch(makeMove(squares, xIsNext)),
    jumpTo: (step) => dispatch(jumpTo(step)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
