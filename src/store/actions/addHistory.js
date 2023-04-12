import { ADD_HISTORY } from "./ActionType"

export const addHistory = (squares) => ({
  type: ADD_HISTORY,
  payload: squares
});
