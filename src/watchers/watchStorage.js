import { useContext, useEffect, useState } from "react";

import MMKVStorage from "react-native-mmkv-storage";
import { Context as LogContext } from "../state/LogContext";

const storage = new MMKVStorage.Loader().withEncryption().initialize();

export default (props) => {
  const { logs, isRecording, setState } = useContext(LogContext);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    if (restored) {
      storage.setMap("logs", {
        isRecording,
        logs,
      });
    }
  }, [logs, isRecording, restored]);

  useEffect(() => {
    let restoredLogs = storage.getMap("logs");

    if (restoredLogs) {
      setState(restoredLogs);
    }
    setRestored(true);
  }, []);

  return null;
};
