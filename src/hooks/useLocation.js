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
      let location = null;
      let errorMsg = null;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        errorMsg = "Permission to access location was denied";
      } else {
        location = await Location.getCurrentPositionAsync({});
      }

      setLocation({
        datetime: new Date().toISOString(),
        location: location ? location.coords : null,
        errorMsg: errorMsg,
      });

      timeoutId = setTimeout(getLocation, options.interval);
    };

    timeoutId = setTimeout(getLocation, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [options.interval]);

  return location;
};
