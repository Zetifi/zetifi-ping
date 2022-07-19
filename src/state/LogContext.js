import React from "react";

export const Context = React.createContext();

const initialState = {
  isRecording: false,
  logs: [[]],
  adhocLog: {
    downloadSpeed: null,
    uploadSpeed: null,
    datetime: null,
  },
};

const actions = {
  SET: "SET",
  SET_IS_RECORDING: "SET_IS_RECORDING",
  APPEND_LOG: "APPEND_LOG",
  WRITE_LOG: "WRITE_LOG",
  SET_ADHOC_LOG: "SET_ADHOC_LOG",
  SET_DEFAULT: "SET_DEFAULT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET:
      return {
        ...state,
        ...action.payload,
      };

    case actions.SET_DEFAULT:
      return {
        ...initialState,
      };

    case actions.SET_IS_RECORDING:
      return {
        ...state,
        isRecording: action.payload,
      };

    case actions.WRITE_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };

    case actions.APPEND_LOG:
      let logs = [...state.logs];
      logs[logs.length - 1] = [...logs[logs.length - 1], ...action.payload];

      return {
        ...state,
        logs,
      };

    case actions.SET_ADHOC_LOG:
      return {
        ...state,
        adhocLog: action.payload,
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
    setDefault() {
      dispatch({ type: actions.SET_DEFAULT });
    },
    setIsRecording(truthy) {
      dispatch({ type: actions.SET_IS_RECORDING, payload: truthy });
    },
    startNewLog() {
      if (state && state.logs && state.logs[state.logs.length - 1].length > 0) {
        dispatch({ type: actions.WRITE_LOG, payload: [] });
      }
    },
    appendToLog(payload) {
      if (Array.isArray(payload)) {
        dispatch({ type: actions.APPEND_LOG, payload: payload });
      }
    },
    setAdhocLog(payload) {
      dispatch({ type: actions.SET_ADHOC_LOG, payload: payload });
    },
    clearAdhocLog() {
      dispatch({
        type: actions.SET_ADHOC_LOG,
        payload: {
          downloadSpeed: null,
          uploadSpeed: null,
          datetime: null,
        },
      });
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
