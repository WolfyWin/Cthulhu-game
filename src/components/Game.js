import React from 'react'
import { connect } from 'react-redux'
import { Board }from './Board'
import { calculateWinner } from "../store/actions/calculateWinner"
import { jumpTo } from "../store/actions/jumpTo"
import {makeMove} from "../store/actions/makeMove"

class Game extends React.Component {
  handleClick(i) {
    const { history, stepNumber, xIsNext } = this.props;
    const current = history[stepNumber];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares).payload;
    if (winner || squares[i]) {
      return;
    }
    this.props.makeMove(i, xIsNext);
  }

  getStatus() {
    const { history, stepNumber, xIsNext } = this.props;
    const current = history[stepNumber];
    const squares = current.squares;
    const winner = calculateWinner(squares).payload;

    if (winner) {
      return winner.winner === 'X' ? 'Le Mortel a sauvé son âme !' : 'Le grand Cthulhu vous a englouti !';
    } else if (stepNumber === 9) {
      return 'Match nul !';
    } else {
      return `${xIsNext ? 'Mortel' : 'Cthulhu'}, à vous de jouer.`;
    }
  }

  render() {
    const { history, stepNumber, jumpTo } = this.props;
    const current = history[stepNumber];
    const squares = current.squares;
    const moves = history.map((step, move) => {
      const desc = move ? `Tour #${move}` : 'Remettre son âme en jeu';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const status = this.getStatus();
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i) => this.handleClick(i)} />
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
