import React, { useEffect } from "react";
import { Context as LogContext } from "../state/LogContext";
import usePing from "../hooks/usePing";

export default () => {
  const { isRecording } = React.useContext(LogContext);
  let ping = null;

  console.log(ping);

  useEffect(() => {
    if (isRecording) {
      ping = usePing();
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      console.log("ping", ping);
    }
  }, [ping, isRecording]);

  return null;
};
