import React, { useEffect, useContext } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, SafeAreaView } from "react-native";
import { Context as RegionContext } from "../../state/RegionContext";
import { Context as LogContext } from "../../state/LogContext";
import { Context as SettingsContext } from "../../state/SettingsContext";
import LogMarkerSet from "./LogMarkerSet";
import { useKeepAwake } from "expo-keep-awake";

export default function Map() {
  useKeepAwake();

  const { log } = useContext(LogContext);
  const settings = useContext(SettingsContext);
  const mapRef = React.useRef();

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      showsUserLocation={true}
      followsUserLocation={settings.actionBar.follow}
    >
      <LogMarkerSet log={log} latest={true} />
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
