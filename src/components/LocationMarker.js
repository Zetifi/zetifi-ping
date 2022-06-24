import React, { useState, useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Marker } from "react-native-maps";
import { Context as LocationContext } from "../state/LocationContext";

export default () => {
  const { location } = React.useContext(LocationContext);

  return (
    location && (
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
      >
        <MaterialIcons name="my-location" size={20} color="rgba(0,0,0,0.8)" />
      </Marker>
    )
  );
};
