import { abs, diff, max, mean, min, std, sum } from "mathjs";
import { useEffect, useRef } from "react";
import Ping from "react-native-ping";

export default (callback, options) => {
  options = {
    timeout: 3000,
    host: "8.8.8.8",
    interval: 5000,
    maxSamples: 5,
    minSamples: 2,
    ignoreFirst: 0,
    ...options,
  };

  const savedCallback = useRef();
  const pingResults = useRef(new Array(options.maxSamples));
  const ignoredPings = useRef(0);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let tick = () => {
      Ping.start(options.host, { timeout: options.timeout })
        .catch((error) => error)
        .then((valueOrError) => {
          if (ignoredPings.current < options.ignoreFirst) {
            ignoredPings.current += 1;
          } else {
            let newPingResults = pingResults.current.slice();
            newPingResults.unshift(valueOrError);
            newPingResults.pop();

            // .filter(Boolean) drops `undefined` values
            let onlyPingResults = newPingResults.filter(Number);
            if (
              onlyPingResults.length &&
              onlyPingResults.length >= options.minSamples
            ) {
              let onlyPingResultsDiff = diff(onlyPingResults);
              savedCallback.current({
                mean: mean(onlyPingResults) | 0,
                min: min(onlyPingResults) | 0,
                max: max(onlyPingResults) | 0,
                std: std(onlyPingResults) | 0,
                jitter:
                  (sum(abs(onlyPingResultsDiff)) / onlyPingResultsDiff.length) |
                  0,
                samples: newPingResults.filter(Boolean),
                dropped:
                  newPingResults.filter(Boolean).length -
                  onlyPingResults.length,
                droppedPercent:
                  (newPingResults.filter(Boolean).length -
                    onlyPingResults.length) /
                  newPingResults.filter(Boolean).length,
              });
            } else if (
              newPingResults.filter(Boolean).length >= options.minSamples
            ) {
              savedCallback.current({
                mean: "?",
                min: "?",
                max: "?",
                std: "?",
                jitter: "?",
                samples: newPingResults.filter(Boolean),
                dropped: newPingResults.filter(Boolean).length,
                droppedPercent: 1,
              });
            }

            pingResults.current = newPingResults;
          }
        });
    };

    let id = setInterval(tick, options.interval);
    return () => clearInterval(id);
  }, [
    savedCallback,
    pingResults,
    options.interval,
    options.timeout,
    options.host,
    options.minSamples,
    options.ignoreFirst,
  ]);
};
