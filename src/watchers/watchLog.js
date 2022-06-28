import React, { useEffect, useState, useContext } from "react";
import usePing from "../hooks/usePing";
import { Context as LogContext } from "../state/LogContext";
import { Context as LocationContext } from "../state/LocationContext";
import { flatten } from "flat";

export default () => {
  const { isRecording, appendToLog, startNewLog, logs } =
    useContext(LogContext);
  const { location } = useContext(LocationContext);
  const ping = usePing({ enabled: isRecording });

  const [append, setAppend] = useState(false);

  useEffect(() => {
    if (!isRecording) {
      startNewLog();
    }
  }, [isRecording]);

  useEffect(() => {
    const log = logs[logs.length - 1];

    if (
      isRecording &&
      ping &&
      location &&
      (log.length === 0 || ping.datetime !== log[log.length - 1].ping.datetime)
    ) {
      appendToLog({
        ping: ping,
        location: location,
      });
    }
  }, [isRecording, ping, location, append]);

  return null;
};
