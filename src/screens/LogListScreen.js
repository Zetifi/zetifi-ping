import React, { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Context as LogContext } from "../state/LogContext";
import { Cell, Section, TableView } from "react-native-tableview-simple";

export default ({ navigation }) => {
  const { logs } = useContext(LogContext);

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFF4",
    paddingBottom: 20,
  },
});
