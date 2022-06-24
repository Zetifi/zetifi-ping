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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants";

const ActionButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <MaterialIcons name={icon} size={35} color={COLORS.zetifiObsidian} />
    </TouchableOpacity>
  );
};

export default () => {
  const insets = useSafeAreaInsets();
  const { region, setRegion, setAnimateToRegion } =
    React.useContext(RegionContext);
  const { location } = React.useContext(LocationContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.actionBar, marginTop: insets.top + 50 }}>
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
  },
  actionBar: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
