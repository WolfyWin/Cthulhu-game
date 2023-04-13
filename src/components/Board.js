import React from "react";
import Square from "./Square";
import { calculateWinner } from "../store/actions/calculateWinner";

export class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        // Ajout d'une propriété className pour gérer les cases gagnantes via une classe CSS
        className={"square " + isWinningSquare(this.props.squares, i)}
      />
    );
  }

  render() {
    return (
      <div>
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

export const isWinningSquare = (squares, i) => {
  // On récupère les cases gagnantes
  const winningSquares = calculateWinner(squares).payload;
  // Si la case est gagnante, on retourne la classe CSS
  if (winningSquares && winningSquares.winningSquares.includes(i) ) {
    return "winning-square";
  }
  return null;
}
