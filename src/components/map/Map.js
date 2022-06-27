import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, SafeAreaView } from "react-native";
import { Context as RegionContext } from "../../state/RegionContext";

export default function Map() {
  const { animateToRegion, setAnimateToRegion } =
    React.useContext(RegionContext);
  const mapRef = React.useRef();

  useEffect(() => {
    if (animateToRegion) {
      mapRef.current.animateToRegion(animateToRegion, 1000);
      setAnimateToRegion(null);
    }
  }, [animateToRegion]);

  return (
    <MapView ref={mapRef} style={styles.map} showsUserLocation={true}></MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  map: {
    flex: 1,
  },
});
