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
    numberOfPings: 1,
  },
  location: {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 1000,
    distanceFilter: 0,
  },
  actionBar: {
    follow: false,
  },
  speedTestModal: {
    visible: false,
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
  SET_ACTION_BAR_FOLLOW: "SET_ACTION_BAR_FOLLOW",
  SET_SPEED_TEST_MODAL_VISIBLE: "SET_SPEED_TEST_MODAL_VISIBLE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET:
      return {
        ping: {
          ...state.ping,
          ...action.payload.ping,
        },
        location: {
          ...state.location,
          ...action.payload.location,
        },
        actionBar: {
          ...state.actionBar,
          ...action.payload.actionBar,
        },
        speedTestModal: {
          ...state.speedTestModal,
          ...action.payload.speedTestModal,
        },
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
    case actions.SET_ACTION_BAR_FOLLOW:
      return {
        ...state,
        actionBar: {
          ...state.actionBar,
          follow: action.payload,
        },
      };
    case actions.SET_SPEED_TEST_MODAL_VISIBLE:
      return {
        ...state,
        speedTestModal: {
          ...state.speedTestModal,
          visible: action.payload,
        },
      };
    case actions.SET_NUMBER_OF_PINGS:
      return {
        ...state,
        ping: {
          ...state.ping,
          numberOfPings: action.payload,
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
    setActionBarFollow: (follow) => {
      dispatch({ type: actions.SET_ACTION_BAR_FOLLOW, payload: follow });
    },
    setSpeedTestModalVisible: (visible) => {
      dispatch({
        type: actions.SET_SPEED_TEST_MODAL_VISIBLE,
        payload: visible,
      });
    },
    setNumberOfPings: (numberOfPings) => {
      numberOfPings = parseInt(numberOfPings);
      if (checkWithinRange(numberOfPings, 1, 1000)) {
        dispatch({ type: actions.SET_NUMBER_OF_PINGS, payload: numberOfPings });
      }
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
