import React, { useContext } from "react";
import { StyleSheet, ScrollView, Button, Alert } from "react-native";
import { Context as LogContext } from "../state/LogContext";
import { Cell, Section, TableView } from "react-native-tableview-simple";

export default ({ navigation }) => {
  const { logs, setDefault } = useContext(LogContext);

  return (
    <ScrollView style={styles.container}>
      <TableView>
        {logs
          .filter((log) => log.length > 0)
          .sort((a, b) => {
            return new Date(b[0].ping.datetime) - new Date(a[0].ping.datetime);
          })
          .map((log, i) => {
            let logName = `${new Date(
              log[0].ping.datetime
            ).toLocaleString()} (n=${log.length})`;
            return (
              <Cell
                key={i}
                cellStyle="RightDetail"
                title={logName}
                onPress={() => {
                  navigation.navigate("Log", { log: log, name: logName });
                }}
                accessory="DisclosureIndicator"
              />
            );
          })}
      </TableView>
      {logs.filter((log) => log.length > 0).length > 0 && (
        <Button
          title="Clear logs"
          onPress={() => {
            Alert.alert(
              "Are you sure?",
              "This will clear all logs",
              [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => setDefault() },
              ],
              { cancelable: false }
            );
          }}
        ></Button>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFF4",
    paddingBottom: 20,
  },
});
