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
    payloadSize: 56,
  },
  location: {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 1000,
    distanceFilter: 0,
  },
};

const actions = {
  SET: "SET",
  SET_PING_TIMEOUT: "SET_PING_TIMEOUT",
  SET_PING_INTERVAL: "SET_PING_INTERVAL",
  SET_PING_HOST: "SET_PING_HOST",
  SET_PING_PAYLOAD_SIZE: "SET_PING_PAYLOAD_SIZE",
  SET_LOCATION_ENABLE_HIGH_ACCURACY: "SET_LOCATION_ENABLE_HIGH_ACCURACY",
  SET_LOCATION_TIMEOUT: "SET_LOCATION_TIMEOUT",
  SET_LOCATION_MAXIMUM_AGE: "SET_LOCATION_MAXIMUM_AGE",
  SET_LOCATION_DISTANCE_FILTER: "SET_LOCATION_DISTANCE_FILTER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET:
      return {
        ...state,
        ...action.payload,
      };
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
    case actions.SET_PING_PAYLOAD_SIZE:
      return {
        ...state,
        ping: {
          ...state.ping,
          payloadSize: action.payload,
        },
      };
    case actions.SET_LOCATION_ENABLE_HIGH_ACCURACY:
      return {
        ...state,
        location: {
          ...state.location,
          enableHighAccuracy: action.payload,
        },
      };
    case actions.SET_LOCATION_TIMEOUT:
      return {
        ...state,
        location: {
          ...state.location,
          timeout: action.payload,
        },
      };
    case actions.SET_LOCATION_MAXIMUM_AGE:
      return {
        ...state,
        location: {
          ...state.location,
          maximumAge: action.payload,
        },
      };
    case actions.SET_LOCATION_DISTANCE_FILTER:
      return {
        ...state,
        location: {
          ...state.location,
          distanceFilter: action.payload,
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
    setState(newState) {
      dispatch({ type: actions.SET, payload: newState });
    },
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
    setPingPayloadSize: (payloadSize) => {
      payloadSize = parseInt(payloadSize);
      dispatch({ type: actions.SET_PING_PAYLOAD_SIZE, payload: payloadSize });
    },
    setLocationEnableHighAccuracy: (enableHighAccuracy) => {
      dispatch({
        type: actions.SET_LOCATION_ENABLE_HIGH_ACCURACY,
        payload: enableHighAccuracy,
      });
    },
    setLocationTimeout: (timeout) => {
      timeout = parseInt(timeout);
      if (checkWithinRange(timeout, 10, 100000)) {
        dispatch({ type: actions.SET_LOCATION_TIMEOUT, payload: timeout });
      }
    },
    setLocationMaximumAge: (maximumAge) => {
      maximumAge = parseInt(maximumAge);
      if (checkWithinRange(maximumAge, 10, 100000)) {
        dispatch({
          type: actions.SET_LOCATION_MAXIMUM_AGE,
          payload: maximumAge,
        });
      }
    },
    setLocationDistanceFilter: (distanceFilter) => {
      distanceFilter = parseInt(distanceFilter);
      if (checkWithinRange(distanceFilter, 0, 100000)) {
        dispatch({
          type: actions.SET_LOCATION_DISTANCE_FILTER,
          payload: distanceFilter,
        });
      }
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
