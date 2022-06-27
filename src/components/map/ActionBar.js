import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as RegionContext } from "../../state/RegionContext";
import { Context as LocationContext } from "../../state/LocationContext";
import { Context as LogContext } from "../../state/LogContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, ICON_SIZE } from "../../constants";

const ActionButton = ({ icon, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <MaterialIcons
        name={icon}
        size={ICON_SIZE}
        color={color ? color : "white"}
      />
    </TouchableOpacity>
  );
};

export default () => {
  const { region, setAnimateToRegion } = React.useContext(RegionContext);
  const { location } = React.useContext(LocationContext);
  const { isRecording, setIsRecording } = React.useContext(LogContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.actionBar }}>
        <ActionButton
          icon={isRecording ? "stop" : "fiber-manual-record"}
          color={COLORS.errorRed}
          onPress={() => {
            setIsRecording(!isRecording);
          }}
        ></ActionButton>
        <ActionButton
          icon="my-location"
          onPress={() => {
            if (location) {
              setAnimateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              });
            }
          }}
        ></ActionButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    right: 0,
  },
  actionBar: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.zetifiObsidian,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingBottom: 10,
  },
  actionButton: {
    marginTop: 10,
    padding: 10,
  },
});
