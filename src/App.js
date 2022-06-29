import Providers from "./Providers";
import WatchLocation from "./watchers/watchLocation";
import WatchLog from "./watchers/watchLog";
import WatchStorage from "./watchers/watchStorage";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigator from "./navigation/Navigator";
import { useKeepAwake } from "expo-keep-awake";

export default function App() {
  useKeepAwake();

  return (
    <Providers>
      <WatchLocation />
      <WatchLog />
      <WatchStorage />
      <SafeAreaProvider>
        <Navigator></Navigator>
      </SafeAreaProvider>
    </Providers>
  );
}
