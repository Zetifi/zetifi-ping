import React from "react";

export const Context = React.createContext();

const checkWithinRange = (value, min, max) => {
  return value >= min && value <= max;
};

const initialState = {
  ping: {
    host: "8.8.8.8",
    interval: 1000,
    timeout: 1000,
    packetSize: 56,
  },
  location: {
    interval: 1000,
  },
};

const actions = {
  SET_PING_TIMEOUT: "SET_PING_TIMEOUT",
  SET_PING_INTERVAL: "SET_PING_INTERVAL",
  SET_PING_HOST: "SET_PING_HOST",
  SET_PING_PACKET_SIZE: "SET_PING_PACKET_SIZE",
  SET_LOCATION_INTERVAL: "SET_LOCATION_INTERVAL",
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
    case actions.SET_PING_PACKET_SIZE:
      return {
        ...state,
        ping: {
          ...state.ping,
          packetSize: action.payload,
        },
      };
    case actions.SET_LOCATION_INTERVAL:
      return {
        ...state,
        location: {
          ...state.location,
          interval: action.payload,
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
    setPingHost: (host) => {
      dispatch({ type: actions.SET_PING_HOST, payload: host });
    },
    setPingInterval: (interval) => {
      interval = parseInt(interval);
      if (checkWithinRange(interval, 10, 100000)) {
        dispatch({ type: actions.SET_PING_INTERVAL, payload: interval });
      }
    },
    setPingTimeout: (timeout) => {
      timeout = parseInt(timeout);
      if (checkWithinRange(timeout, 10, 100000)) {
        dispatch({ type: actions.SET_PING_TIMEOUT, payload: timeout });
      }
    },
    setPingPacketSize: (packetSize) => {
      packetSize = parseInt(packetSize);
      if (checkWithinRange(packetSize, 56, 100000)) {
        dispatch({ type: actions.SET_PING_PACKET_SIZE, payload: packetSize });
      }
    },
    setLocationInterval: (interval) => {
      interval = parseInt(interval);
      if (checkWithinRange(interval, 10, 100000)) {
        dispatch({ type: actions.SET_LOCATION_INTERVAL, payload: interval });
      }
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
