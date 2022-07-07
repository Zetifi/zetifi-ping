import React, { useEffect, useState, useContext } from "react";
import usePing from "../hooks/usePing";
import { Context as LogContext } from "../state/LogContext";
import { Context as LocationContext } from "../state/LocationContext";
import { Context as SettingsContext } from "../state/SettingsContext";
import { flatten } from "flat";

export default () => {
  const { isRecording, appendToLog, startNewLog, logs } =
    useContext(LogContext);
  const settings = useContext(SettingsContext);
  const { location } = useContext(LocationContext);

  const ping = usePing({
    enabled: isRecording,
    ...settings.ping,
  });

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
        settings: {
          ping: settings.ping,
          location: settings.location,
        },
      });
    }
  }, [isRecording, ping, location, settings.ping, settings.location]);

  return null;
};
