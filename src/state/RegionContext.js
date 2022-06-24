import React from "react";
import { DEFAULT_REGION } from "../constants";

export const Context = React.createContext();

const initialState = {
  region: DEFAULT_REGION,
  animateToRegion: false,
};

const actions = {
  SET_REGION: "SET_REGION",
  ANIMATE_TO_REGION: "ANIMATE_TO_REGION",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case actions.ANIMATE_TO_REGION:
      return {
        ...state,
        animateToRegion: action.payload,
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
    setAnimateToRegion: (location) => {
      dispatch({ type: actions.ANIMATE_TO_REGION, payload: location });
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
