import { CHANGE_INTERVAL } from "./action";

const INITIAL_STATE = 1;

export const reducer = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case CHANGE_INTERVAL:
      const interval = state + action.payload;
      return interval > 0 ? interval : 1;
    default:
      return state;
  }
};
