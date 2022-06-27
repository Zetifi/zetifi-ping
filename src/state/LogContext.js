import React from "react";

export const Context = React.createContext();

const initialState = {
  isRecording: false,
  logs: [],
};

const actions = {
  SET_IS_RECORDING: "SET_IS_RECORDING",
  ADD_LOG: "ADD_LOG",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_IS_RECORDING:
      return {
        ...state,
        isRecording: action.payload,
      };
    case actions.ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    ...state,
    setIsRecording(truthy) {
      dispatch({ type: actions.SET_IS_RECORDING, payload: truthy });
    },
    addLog(log) {
      dispatch({ type: actions.ADD_LOG, payload: log });
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
