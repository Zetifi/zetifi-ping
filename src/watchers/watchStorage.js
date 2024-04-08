import { useContext, useEffect, useState } from "react";

import { Context as LogContext } from "../state/LogContext";
import { Context as SettingsContext } from "../state/SettingsContext";

import storage from "../storage";

export default (props) => {
  const settings = useContext(SettingsContext);
  const logs = useContext(LogContext);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    if (restored) {
      storage.setMap("logs", {
        isRecording: logs.isRecording,
        log: logs.log,
      });
    }
  }, [logs, restored]);

  useEffect(() => {
    if (restored) {
      storage.setMap("settings", {
        ping: settings.ping,
        location: settings.location,
      });
    }
  }, [settings, restored]);

  useEffect(() => {
    let restoredLogs = storage.getMap("logs");
    let restoredSettings = storage.getMap("settings");

    if (restoredLogs) {
      // Move from old storage format to new storage format
      if (restoredLogs.logs && restoredLogs.logs.length > 0) {
        for (let i = 0; i < restoredLogs.logs.length; i++) {
          let log = restoredLogs.logs[i];
          if (log.length > 0) {
            storage.setMap(`log_${log[0].ping.datetime}_${log.length}`, {
              data: log,
            });
          }
        }
      }
      delete restoredLogs.logs;
      // End move from old storage format to new storage format

      logs.setState(restoredLogs);
    }

    if (restoredSettings) {
      settings.setState(restoredSettings);
    }

    setRestored(true);
  }, []);

  return null;
};
