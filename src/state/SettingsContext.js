import React from "react";

export const Context = React.createContext();

const initialState = {
  ping: {
    timeout: 1000,
    interval: 1000,
    host: "8.8.8.8",
  },
};

const actions = {
  SET_PING_TIMEOUT: "SET_PING_TIMEOUT",
  SET_PING_INTERVAL: "SET_PING_INTERVAL",
  SET_PING_HOST: "SET_PING_HOST",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_PING_TIMEOUT:
      return {
        ...state,
        ping: {
          ...state.ping,
          timeout: action.payload,
        },
      };
    case actions.SET_PING_INTERVAL:
      return {
        ...state,
        ping: {
          ...state.ping,
          interval: action.payload,
        },
      };
    case actions.SET_PING_HOST:
      return {
        ...state,
        ping: {
          ...state.ping,
          host: action.payload,
        },
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    ...state,
    setPingTimeout: (timeout) =>
      dispatch({ type: actions.SET_PING_TIMEOUT, payload: timeout }),
    setPingInterval: (interval) =>
      dispatch({ type: actions.SET_PING_INTERVAL, payload: interval }),
    setPingHost: (host) =>
      dispatch({ type: actions.SET_PING_HOST, payload: host }),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
