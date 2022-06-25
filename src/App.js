import Providers from "./Providers";
import WatchLocation from "./watchers/watchLocation";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigator from "./navigation/Navigator";

export default function App() {
  return (
    <Providers>
      <WatchLocation />
      <SafeAreaProvider>
        <Navigator></Navigator>
      </SafeAreaProvider>
    </Providers>
  );
}
