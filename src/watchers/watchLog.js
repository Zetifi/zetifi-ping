import React, { useEffect, useState, useContext } from "react";
import usePing from "../hooks/usePing";
import { Context as LogContext } from "../state/LogContext";
import { Context as LocationContext } from "../state/LocationContext";
import { Context as SettingsContext } from "../state/SettingsContext";
import { flatten } from "flat";

export default () => {
  const {
    isRecording,
    appendToLog,
    endAndStoreLog,
    log,
    adhocLog,
    clearAdhocLog,
  } = useContext(LogContext);
  const settings = useContext(SettingsContext);
  const { location } = useContext(LocationContext);

  const ping = usePing({
    enabled: isRecording,
    ...settings.ping,
  });

  useEffect(() => {
    if (!isRecording) {
      endAndStoreLog();
    }
  }, [isRecording]);

  useEffect(() => {
    if (
      isRecording &&
      ping &&
      location &&
      (log.length === 0 ||
        ping[0].datetime !== log[log.length - 1].ping.datetime)
    ) {
      let currentAdhocLog = {
        downloadSpeed: null,
        uploadSpeed: null,
        datetime: null,
      };

      if (adhocLog.downloadSpeed && adhocLog.uploadSpeed && adhocLog.datetime) {
        currentAdhocLog = {
          ...adhocLog,
        };
      }

      appendToLog(
        ping.map((ping) => {
          return {
            ping: ping,
            location: location,
            settings: {
              ping: settings.ping,
              location: settings.location,
            },
            adhocLog: currentAdhocLog,
          };
        })
      );

      if (adhocLog.downloadSpeed && adhocLog.uploadSpeed && adhocLog.datetime) {
        clearAdhocLog();
      }
    }
  }, [isRecording, ping, location, settings.ping, settings.location]);

  return null;
};
