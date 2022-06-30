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
import { FontAwesome } from "@expo/vector-icons";
import { Context as RegionContext } from "../../state/RegionContext";
import { Context as LocationContext } from "../../state/LocationContext";
import { Context as SettingsContext } from "../../state/SettingsContext";
import { Context as LogContext } from "../../state/LogContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, ICON_SIZE } from "../../constants";
import Color from "color";

const ActionButton = ({
  icon,
  onPress,
  IconComponent,
  color = "white",
  active = false,
}) => {
  let activeColor = Color(color).alpha(0.2).rgb().string();

  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <IconComponent
        name={icon}
        size={ICON_SIZE}
        color={active ? activeColor : color}
      />
    </TouchableOpacity>
  );
};

export default () => {
  const { region, setAnimateToRegion } = React.useContext(RegionContext);
  const { location } = React.useContext(LocationContext);
  const settings = React.useContext(SettingsContext);
  const { isRecording, setIsRecording } = React.useContext(LogContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.actionBar }}>
        <ActionButton
          IconComponent={MaterialIcons}
          icon={isRecording ? "stop" : "fiber-manual-record"}
          color={COLORS.errorRed}
          onPress={() => {
            setIsRecording(!isRecording);
          }}
        ></ActionButton>
        <ActionButton
          icon="my-location"
          IconComponent={MaterialIcons}
          active={settings.actionBar.follow}
          onPress={() => {
            settings.setActionBarFollow(!settings.actionBar.follow);
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
