import { abs, diff, max, mean, min, std, sum } from "mathjs";
import React, { useEffect, useRef, useState } from "react";
import Ping from "react-native-ping";

// Stolen from https://stackoverflow.com/a/70114114
Promise.allSettled =
  Promise.allSettled ||
  ((promises) =>
    Promise.all(
      promises.map((p) =>
        p
          .then((value) => ({
            status: "fulfilled",
            value,
          }))
          .catch((reason) => ({
            status: "rejected",
            reason,
          }))
      )
    ));

export default (options) => {
  const [ping, setPing] = useState(null);

  options = {
    enabled: false,
    ...options,
  };

  useEffect(() => {
    let timeoutId = null;

    if (options.enabled) {
      let getPingResult = async () => {
        let pingPromises = [];
        for (let i = 0; i < options.numberOfPings; i++) {
          pingPromises.push(
            Ping.start(options.host, {
              timeout: options.timeout,
              payloadSize: options.payloadSize,
            })
          );
        }
        let pingResults = await Promise.allSettled(pingPromises).then(
          (results) => {
            let datetime = new Date().toISOString();
            return results.map((result) => {
              if (result.status === "fulfilled") {
                return {
                  datetime: datetime,
                  ping: result.value,
                  errorMsg: null,
                };
              } else {
                return {
                  datetime: datetime,
                  ping: null,
                  errorMsg: result.reason.message,
                };
              }
            });
          }
        );

        setPing(pingResults);

        timeoutId = setTimeout(getPingResult, options.interval);
      };

      clearTimeout(timeoutId);
      timeoutId = setTimeout(getPingResult, 0);
    }

    return () => {
      clearTimeout(timeoutId);
      setPing(null);
    };
  }, [
    options.enabled,
    options.host,
    options.interval,
    options.timeout,
    options.numberOfPings,
  ]);

  return ping;
};
