import { Provider as RegionProvider } from "./state/RegionContext";
import { Provider as LocationProvider } from "./state/LocationContext";
import { Provider as LogContext } from "./state/LogContext";

export default ({ children }) => {
  return (
    <RegionProvider>
      <LocationProvider>
        <LogContext>{children}</LogContext>
      </LocationProvider>
    </RegionProvider>
  );
};
