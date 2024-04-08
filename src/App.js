import Providers from "./Providers";
import WatchLocation from "./watchers/watchLocation";
import WatchLog from "./watchers/watchLog";
import WatchStorage from "./watchers/watchStorage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";

import Navigator from "./navigation/Navigator";

export default function App() {
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
