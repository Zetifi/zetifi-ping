import React, { useState, useEffect } from "react";
import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";

export default (options) => {
  const [location, setLocation] = useState(null);

  options = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 1000,
    distanceFilter: 0,
    ...options,
  };

  useEffect(() => {
    let watchId = null;

    let getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation({
          datetime: new Date().toISOString(),
          coords: null,
          errorMsg: "Location permission not granted",
        });
      } else {
        watchId = Geolocation.watchPosition(
          (position) => {
            setLocation({
              datetime: new Date().toISOString(),
              coords: position.coords,
              errorMsg: null,
            });
          },
          (error) => {
            setLocation({
              datetime: new Date().toISOString(),
              coords: null,
              errorMsg: error.message,
            });
          },
          options
        );
      }
    };

    getLocation();

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [
    options.enableHighAccuracy,
    options.timeout,
    options.maximumAge,
    options.distanceFilter,
  ]);

  return location;
};
