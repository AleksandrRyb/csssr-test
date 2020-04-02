import { reducer } from "./reducer";

const createStore = (reducer, initialState) => {
  let currentState = initialState;
  const listeners = [];

  const getState = () => currentState;

  const dispatch = action => {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => listeners.push(listener);

  dispatch({ type: "INIT" });

  return { getState, dispatch, subscribe };
};

export default () => createStore(reducer);
