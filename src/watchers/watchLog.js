import React, { useEffect, useState, useContext } from "react";
import usePing from "../hooks/usePing";
import { Context as LogContext } from "../state/LogContext";
import { Context as LocationContext } from "../state/LocationContext";
import { flatten } from "flat";

export default () => {
  const { isRecording, addLog } = useContext(LogContext);
  const { location } = useContext(LocationContext);
  const ping = usePing({ enabled: isRecording });

  const [log, setLog] = useState([]);

  useEffect(() => {
    if (isRecording && log.length === 0) {
      setLog([]);
    } else if (!isRecording && log.length > 0) {
      addLog(log.map(flatten));
    }
  }, [isRecording]);

  useEffect(() => {
    if (
      isRecording &&
      ping &&
      (log.length == 0 ||
        (ping.datetime !== log[log.length - 1].ping.datetime &&
          location.datetime !== log[log.length - 1].location.datetime))
    ) {
      setLog([
        ...log,
        {
          ping: ping,
          location: location,
        },
      ]);
    }
  }, [isRecording, ping, location]);

  return null;
};
