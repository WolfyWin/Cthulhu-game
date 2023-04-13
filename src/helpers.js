import { calculateWinner } from "./store/actions/calculateWinner";

export const isWinningSquare = (squares, i) => {
  const winningSquares = calculateWinner(squares).payload;
  if (winningSquares && winningSquares.winningSquares.includes(i)) {
    return "winning-square";
  }
  return null;
};
