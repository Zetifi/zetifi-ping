import React from "react";
import { StyleSheet, ScrollView, TextInput, Dimensions } from "react-native";
import { Text } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import MapView from "react-native-maps";
import LogMarkerSet from "../components/map/LogMarkerSet";
import {
  calculateDroppedPercentage,
  calculateAverage,
  calculateJitter,
  getSuccesfulPings,
} from "../logUtils";

const DisabledInputCell = ({ title, value }) => {
  return (
    <Cell
      title={title}
      cellAccessoryView={
        <TextInput
          style={{ fontSize: 16, flex: 1, textAlign: "right" }}
          value={value.toString()}
          editable={false}
        />
      }
    />
  );
};

export default ({ route }) => {
  return (
    <ScrollView style={styles.container}>
      <TableView>
        <Section header="Log Map">
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: route.params.log[0].location.coords.latitude,
              longitude: route.params.log[0].location.coords.longitude,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421,
            }}
          >
            <LogMarkerSet log={route.params.log} latest={true} />
          </MapView>
        </Section>

        <Section header="Log Statistics">
          <DisabledInputCell
            title="Total Points"
            value={route.params.log.length}
          />
          <DisabledInputCell
            title="Packet Loss (%)"
            value={calculateDroppedPercentage(route.params.log)}
          />
          <DisabledInputCell
            title="Ping Average"
            value={calculateAverage(getSuccesfulPings(route.params.log))}
          />
          <DisabledInputCell
            title="Ping Jitter"
            value={calculateJitter(getSuccesfulPings(route.params.log))}
          />
        </Section>
      </TableView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFF4",
    paddingBottom: 20,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
});
