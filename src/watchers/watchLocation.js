import React, { useEffect } from "react";
import { Context as LocationContext } from "../state/LocationContext";
import { Context as SettingsContext } from "../state/SettingsContext";
import { Context as RegionContext } from "../state/RegionContext";
import useLocation from "../hooks/useLocation";

export default () => {
  const { setLocation } = React.useContext(LocationContext);
  const settings = React.useContext(SettingsContext);
  const location = useLocation({
    ...settings.location,
  });

  useEffect(() => {
    if (location) {
      setLocation(location);
    }
  }, [location]);

  return null;
};
