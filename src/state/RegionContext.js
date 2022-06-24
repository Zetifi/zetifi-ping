import React from "react";
import { DEFAULT_REGION } from "../constants";

export const Context = React.createContext();

const initialState = {
  region: DEFAULT_REGION,
};

const actions = {
  SET_REGION: "SET_REGION",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_REGION:
      return {
        ...state,
        region: action.payload,
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    ...state,
    setRegion: (region) => {
      dispatch({ type: actions.SET_REGION, payload: region });
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
