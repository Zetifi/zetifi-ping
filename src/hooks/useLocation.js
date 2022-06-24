import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

export default (options) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  options = {
    interval: 1000,
    ...options,
  };

  useEffect(() => {
    let timeoutId = null;

    let getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }

      timeoutId = setTimeout(getLocation, options.interval);
    };

    timeoutId = setTimeout(getLocation, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [options.interval]);

  return { location, errorMsg };
};
