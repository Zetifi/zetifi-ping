import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Share,
  TextInput,
} from "react-native";
import { Context as SettingsContext } from "../state/SettingsContext";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { COLORS } from "../constants";

let capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

let KEY_TO_TITLE = {
  ping: {
    host: "Host",
    interval: "Interval (ms)",
    timeout: "Timeout (ms)",
    packetSize: "Packet Size (bytes)",
  },
  location: {
    interval: "Interval (ms)",
  },
};

export default () => {
  const settings = useContext(SettingsContext);
  return (
    <ScrollView style={styles.container}>
      <TableView>
        <Section header="Ping Settings">
          {Object.keys(settings.ping).map((key, i) => {
            return (
              <Cell
                key={i}
                title={KEY_TO_TITLE.ping[key]}
                detail={settings.ping[key].toString()}
                cellAccessoryView={
                  <TextInput
                    style={{ fontSize: 16, flex: 1, textAlign: "right" }}
                    value={settings.ping[key].toString()}
                    onChangeText={(value) => {
                      let f = settings[`setPing${capitalizeFirstLetter(key)}`];
                      if (f) {
                        f(value);
                      }
                    }}
                  />
                }
              />
            );
          })}
        </Section>
        <Section header="GPS Settings">
          {Object.keys(settings.location).map((key, i) => {
            return (
              <Cell
                key={i}
                title={KEY_TO_TITLE.location[key]}
                detail={settings.location[key].toString()}
                cellAccessoryView={
                  <TextInput
                    style={{ fontSize: 16, flex: 1, textAlign: "right" }}
                    value={settings.location[key].toString()}
                  />
                }
              />
            );
          })}
        </Section>
      </TableView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFF4",
    paddingTop: 20,
    paddingBottom: 20,
  },
});
