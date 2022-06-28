import React, { useEffect, useState, useContext } from "react";
import usePing from "../hooks/usePing";
import { Context as LogContext } from "../state/LogContext";
import { Context as LocationContext } from "../state/LocationContext";
import { flatten } from "flat";

export default () => {
  const { isRecording, writeLog, logs } = useContext(LogContext);
  const { location } = useContext(LocationContext);
  const ping = usePing({ enabled: isRecording });

  const [append, setAppend] = useState(false);

  useEffect(() => {
    const log = logs[logs.length - 1];

    if (isRecording && log) {
      setAppend(true);
    } else if (!isRecording) {
      setAppend(false);
    }
  }, [isRecording]);

  useEffect(() => {
    const log = logs[logs.length - 1];

    if (
      isRecording &&
      ping &&
      (!log ||
        (ping.datetime !== log[log.length - 1].ping.datetime &&
          location.datetime !== log[log.length - 1].location.datetime))
    ) {
      writeLog(
        {
          ping: ping,
          location: location,
        },
        append
      );

      if (!append) {
        setAppend(true);
      }
    }
  }, [isRecording, ping, location, append]);

  return null;
};
