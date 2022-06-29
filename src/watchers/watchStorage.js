import { useContext, useEffect, useState } from "react";

import MMKVStorage from "react-native-mmkv-storage";
import { Context as LogContext } from "../state/LogContext";
import { Context as SettingsContext } from "../state/SettingsContext";

const storage = new MMKVStorage.Loader().withEncryption().initialize();

export default (props) => {
  const settings = useContext(SettingsContext);
  const logs = useContext(LogContext);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    if (restored) {
      storage.setMap("logs", {
        isRecording: logs.isRecording,
        logs: logs.logs,
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
      logs.setState(restoredLogs);
    }

    console.log(restoredSettings);

    if (restoredSettings) {
      settings.setState(restoredSettings);
    }

    setRestored(true);
  }, []);

  return null;
};
