import Providers from "./Providers";
import WatchLocation from "./watchers/watchLocation";
import WatchLog from "./watchers/watchLog";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigator from "./navigation/Navigator";

export default function App() {
  return (
    <Providers>
      <WatchLocation />
      <WatchLog />
      <SafeAreaProvider>
        <Navigator></Navigator>
      </SafeAreaProvider>
    </Providers>
  );
}
