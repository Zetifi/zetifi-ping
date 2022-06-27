import React, { useEffect } from "react";
import usePing from "../hooks/usePing";
import { Context as LogContext } from "../state/LogContext";

export default () => {
  const { isRecording } = React.useContext(LogContext);
  const { ping } = usePing();

  useEffect(() => {
    if (isRecording) {
      console.log("recording started");
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      console.log("ping", ping);
    }
  }, [isRecording, ping]);

  return null;
};
