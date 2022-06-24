import React, { useState, useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Circle, Marker } from "react-native-maps";
import { Context as LocationContext } from "../../state/LocationContext";

export default () => {
  const { location } = React.useContext(LocationContext);

  return (
    location && (
      <>
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <MaterialIcons name="my-location" size={20} color="rgba(0,0,0,0.8)" />
        </Marker>
        <Circle
          center={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          radius={location.coords.accuracy}
          strokeWidth={0}
          fillColor="rgba(0,0,0,0.3)"
        />
      </>
    )
  );
};
