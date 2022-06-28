import React, { useEffect, useContext } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, SafeAreaView } from "react-native";
import { Context as RegionContext } from "../../state/RegionContext";
import { Context as LogContext } from "../../state/LogContext";
import LogMarkerSet from "./LogMarkerSet";

export default function Map() {
  const { logs } = useContext(LogContext);
  const { animateToRegion, setAnimateToRegion } = useContext(RegionContext);
  const mapRef = React.useRef();

  useEffect(() => {
    if (animateToRegion) {
      mapRef.current.animateToRegion(animateToRegion, 1000);
      setAnimateToRegion(null);
    }
  }, [animateToRegion]);

  return (
    <MapView ref={mapRef} style={styles.map} showsUserLocation={true}>
      {logs.map((log, i) => {
        return (
          <LogMarkerSet key={i} log={log} latest={i === logs.length - 1} />
        );
      })}
    </MapView>
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
