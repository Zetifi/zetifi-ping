import { Provider as RegionProvider } from "./state/RegionContext";
import { Provider as LocationProvider } from "./state/LocationContext";
import { Provider as LogContext } from "./state/LogContext";
import { Provider as SettingsContext } from "./state/SettingsContext";

export default ({ children }) => {
  return (
    <RegionProvider>
      <LocationProvider>
        <LogContext>
          <SettingsContext>{children}</SettingsContext>
        </LogContext>
      </LocationProvider>
    </RegionProvider>
  );
};
