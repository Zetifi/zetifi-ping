import { Provider as RegionProvider } from "./state/RegionContext";
import { Provider as LocationProvider } from "./state/LocationContext";
import Map, { ActionBar } from "./components/map";
import WatchLocation from "./watchers/watchLocation";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <RegionProvider>
      <LocationProvider>
        <SafeAreaProvider>
          <Map />
          <ActionBar />
          <WatchLocation />
        </SafeAreaProvider>
      </LocationProvider>
    </RegionProvider>
  );
}
