import { Provider as RegionProvider } from "./state/RegionContext";
import { Provider as LocationProvider } from "./state/LocationContext";
import Map from "./components/map";
import WatchLocation from "./watchers/watchLocation";

export default function App() {
  return (
    <RegionProvider>
      <LocationProvider>
        <Map />
        <WatchLocation />
      </LocationProvider>
    </RegionProvider>
  );
}
