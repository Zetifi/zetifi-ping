import { abs, diff, max, mean, min, std, sum } from "mathjs";
import React, { useEffect, useRef, useState } from "react";
import Ping from "react-native-ping";

export default (options) => {
  const [ping, setPing] = useState(null);

  options = {
    interval: 1000,
    timeout: 3000,
    host: "8.8.8.8",
    enabled: false,
    ...options,
  };

  useEffect(() => {
    let timeoutId = null;

    if (options.enabled) {
      let getPingResult = async () => {
        let ping = null;
        let errorMsg = null;
        try {
          ping = await Ping.start(options.host, {
            timeout: options.timeout,
          });
        } catch (e) {
          errorMsg = e.message;
        }

        setPing({
          datetime: new Date().toISOString(),
          ping: ping,
          errorMsg: errorMsg,
        });

        timeoutId = setTimeout(getPingResult, options.interval);
      };

      clearTimeout(timeoutId);
      timeoutId = setTimeout(getPingResult, 0);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [options.enabled, options.host, options.interval, options.timeout]);

  return ping;
};
