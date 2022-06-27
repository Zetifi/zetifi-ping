import { abs, diff, max, mean, min, std, sum } from "mathjs";
import React, { useEffect, useRef, useState } from "react";
import Ping from "react-native-ping";
import { Context as LogContext } from "../state/LogContext";

export default (options) => {
  const { isRecording } = React.useContext(LogContext);
  const [ping, setPing] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  options = {
    interval: 1000,
    timeout: 3000,
    host: "8.8.8.8",
    ...options,
  };

  useEffect(() => {
    let timeoutId = null;

    if (isRecording) {
      let getPingResult = async () => {
        try {
          setPing(
            await Ping.start(options.host, {
              timeout: options.timeout,
            })
          );
        } catch (e) {
          setErrorMsg(e.message);
        }

        timeoutId = setTimeout(getPingResult, options.interval);
      };

      clearTimeout(timeoutId);
      timeoutId = setTimeout(getPingResult, 0);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRecording]);

  return { ping, errorMsg };
};
