import * as ActionType from "../actions/ActionType";
import { calculateWinner } from "../actions/calculateWinner";

const initialState = {
  xIsNext: true,
  winner: null,
  winningSquares: null,
  stepNumber: 0,
  history: [{
    squares: Array(9).fill(null)
  }]
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_SQUARE:
      return {
        ...state,
        xIsNext: !state.xIsNext
      };
    case ActionType.CALCULATE_WINNER:
      return {
        ...state,
        winner: action.payload.winner,
        winningSquares: action.payload.winningSquares
      };
    case ActionType.ADD_HISTORY:
      return [...state, { squares: action.payload }];

    case ActionType.MAKE_MOVE:
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (calculateWinner(squares).payload || squares[action.payload]) {
        return state;
      }

      squares[action.payload] = state.xIsNext ? 'X' : 'O';
      let winner = calculateWinner(squares).payload;

      return {
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
        winner: winner,
      };

    case ActionType.JUMP_TO:
      return {
        ...state,
        stepNumber: action.payload,
        xIsNext: action.payload % 2 === 0,
      }
    default:
      return state;
  }
};

export default gameReducer;
