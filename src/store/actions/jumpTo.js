import { MAKE_MOVE, JUMP_TO } from "./actions"

export const jumpTo = (step) => ({
  type: JUMP_TO,
  payload: step
});

export const makeMove = (i) => ({
  type: MAKE_MOVE,
  payload: i
});
