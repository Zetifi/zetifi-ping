import React, { useEffect, useState, useContext } from "react";
import usePing from "../hooks/usePing";
import { Context as LogContext } from "../state/LogContext";
import { Context as LocationContext } from "../state/LocationContext";

export default () => {
  const { isRecording } = useContext(LogContext);
  const { location } = useContext(LocationContext);
  const ping = usePing({ enabled: isRecording });

  const [log, setLog] = useState([]);

  let saveLog = () => {};

  useEffect(() => {
    if (isRecording && log.length === 0) {
      console.log("recording started");
    } else if (!isRecording && log.length > 0) {
      console.log("recording stopped");
      console.log(log);
      setLog([]);
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
