import React from "react";
import Square from "./Square";
import {calculateWinner} from "../store/actions/calculateWinner";

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
    const squares = this.props.squares.map((square, i) => (
      <Square
        key={i}
        value={square}
        onClick={() => this.props.onClick(i)}
        className={"square " + isWinningSquare(this.props.squares, i)}
      />
    ));
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(
        <div key={i} className="board-row">
          {squares.slice(i * 3, i * 3 + 3)}
        </div>
      );
    }
    return <div>{rows}</div>;
  }
}

export const isWinningSquare = (squares, i) => {
  const winningSquares = calculateWinner(squares).payload;
  if (winningSquares && winningSquares.winningSquares.includes(i)) {
    return "winning-square";
  }
  return null;
};
