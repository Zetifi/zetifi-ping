import React from "react";

export const Context = React.createContext();

const initialState = {
  isRecording: false,
};

const actions = {
  SET_IS_RECORDING: "SET_IS_RECORDING",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_IS_RECORDING:
      return {
        ...state,
        isRecording: action.payload,
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
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
