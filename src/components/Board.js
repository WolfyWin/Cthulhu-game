import React from "react";
import Square from "./Square";
import {isWinningSquare} from "../helpers";

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
