import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { Context as RegionContext } from "../../state/RegionContext";
import LocationMarker from "./LocationMarker";
import ActionBar from "./ActionBar";

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
        <ActionBar></ActionBar>
      </MapView>
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
