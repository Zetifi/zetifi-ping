import React from "react";

export const Context = React.createContext();

const initialState = {
  location: null,
};

const actions = {
  SET_LOCATION: "SET_LOCATION",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    ...state,
    setLocation(location) {
      dispatch({ type: actions.SET_LOCATION, payload: location });
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
