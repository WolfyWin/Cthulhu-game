import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    // Ajout d'un attribut className pour gérer les cases gagnantes via une classe CSS
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        // AJout d'une propriété className pour gérer les cases gagnantes via une classe CSS
        className={isWinningSquare(this.props.squares, i)}
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Tour #' + move :
        'Mettre son âme en jeu';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    
    if (result) {
      status = result.winner === "X" ? "Le Mortel a sauvé son âme !" : "Le grand Cthulhu vous a englouti !";
    } else if( this.state.stepNumber === 9 ) {
      status = "Match nul !";
    } else {
      status = (this.state.xIsNext ? 'Mortel' : 'Cthulhu') + ", à vous de jouer.";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
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

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
/* fonction qui permet de déterminer si un joueur a gagné */
function calculateWinner(squares) {
  /* les différentes combinaisons gagnantes */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  /* on parcourt les combinaisons gagnantes */
  for (let i = 0; i < lines.length; i++) {
    /* on récupère les 3 cases de la combinaison */
    const [a, b, c] = lines[i];
    /* si les 3 cases sont identiques et non nulles, on retourne le joueur gagnant et les cases gagnantes */
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner : squares[a],
        // Ajout d'un tableau contenant les cases gagnantes
        winningSquares : [a, b, c]
      }
    }
  }
  /* si aucune combinaison n'est gagnante, on retourne null */
  return null;
}

// Ajout d'une fonction qui permet de déterminer si une case est gagnante en retournant une classe CSS
function isWinningSquare(squares, square) {
  let result = calculateWinner(squares);
  return result && result.winningSquares.includes(square) ? "square winning-square" : "square";
}

