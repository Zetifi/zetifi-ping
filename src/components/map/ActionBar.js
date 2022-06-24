import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as RegionContext } from "../../state/RegionContext";
import { Context as LocationContext } from "../../state/LocationContext";

export default function Map() {
  const { location } = React.useContext(RegionContext);
  const { region } = React.useContext(LocationContext);

  return (
    <View style={styles.container}>
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
        onPress={() => {
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
        <MaterialIcons name="my-location" size={24} color="black" />
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
