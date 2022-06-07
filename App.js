import React, { useState, useEffect } from "react";
import MapView, { Circle } from "react-native-maps";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          location &&
          location.coords && {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
      >
        <Circle
          center={
            location &&
            location.coords && {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
          }
          radius={100}
          fillColor="rgba(255,0,0,0.3)"
          strokeColor="rgba(255,0,0,0.9)"
        />
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
          setLocation(location);
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
