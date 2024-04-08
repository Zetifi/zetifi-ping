import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TextInput, Dimensions } from "react-native";
import { Text } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import MapView from "react-native-maps";
import LogMarkerSet from "../components/map/LogMarkerSet";
import storage from "../storage";
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
  const { logKey } = route.params;
  const [log, setLog] = useState(null);

  useEffect(() => {
    setLog(storage.getMap(logKey));
  }, [logKey]);

  return (
    log && (
      <ScrollView style={styles.container}>
        <TableView>
          <Section header="Log Map">
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: log.data[0].location.coords.latitude,
                longitude: log.data[0].location.coords.longitude,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421,
              }}
            >
              <LogMarkerSet log={log.data} latest={true} />
            </MapView>
          </Section>

          <Section header="Log Statistics">
            <DisabledInputCell title="Total Pings" value={log.data.length} />
            <DisabledInputCell
              title="Packet Loss (%)"
              value={calculateDroppedPercentage(log.data)}
            />
            <DisabledInputCell
              title="Ping Average"
              value={calculateAverage(getSuccesfulPings(log.data))}
            />
            <DisabledInputCell
              title="Ping Jitter"
              value={calculateJitter(getSuccesfulPings(log.data))}
            />
          </Section>
        </TableView>
      </ScrollView>
    )
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
