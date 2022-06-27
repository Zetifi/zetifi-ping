import React, { useEffect } from "react";
import { Context as LocationContext } from "../state/LocationContext";
import useLocation from "../hooks/useLocation";

export default () => {
  const location = useLocation();
  const { setLocation } = React.useContext(LocationContext);

  useEffect(() => {
    if (location) {
      setLocation(location);
    }
  }, [location]);

  return null;
};
