import React, { useState, useEffect, useRef } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context as RegionContext } from "../state/RegionContext";
import LocationMarker from "./LocationMarker";

export default function Map() {
  const { region, setRegion } = React.useContext(RegionContext);

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        onRegionChangeComplete={setRegion}
        style={styles.map}
      >
        <LocationMarker />
      </MapView>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          width: 50,
          height: 50,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: 1,
        }}
        onPress={async () => {
          let location = await Location.getLastKnownPositionAsync();
          if (location) {
            setRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
          }
        }}
      >
        <MaterialCommunityIcons name="crosshairs-gps" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
