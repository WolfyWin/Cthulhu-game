import { UPDATE_SQUARE } from "./ActionType"

export const updateSquare = (index, value) => ({
  type: UPDATE_SQUARE,
  payload: {
      index,
      value
    }
});
