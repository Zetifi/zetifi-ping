import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView, Button, Alert } from "react-native";
import { Context as LogContext } from "../state/LogContext";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { useIsFocused } from "@react-navigation/native";
import storage from "../storage";

const LOG_PREFIX = "log_";

export default ({ navigation }) => {
  const focus = useIsFocused();
  const [logKeys, setLogKeys] = useState([]);

  useEffect(() => {
    if (focus) {
      storage.indexer.getKeys().then((keys) => {
        setLogKeys(
          keys.filter(
            (key) => key.substring(0, LOG_PREFIX.length) === LOG_PREFIX
          )
        );
      });
    }
  }, [focus]);

  return (
    <ScrollView style={styles.container}>
      <TableView>
        {logKeys
          .sort((a, b) => {
            return new Date(b.split("_")[1]) - new Date(a.split("_")[1]);
          })
          .map((logKey, i) => {
            [_, logDatetime, n] = logKey.split("_");
            logName = `${new Date(logDatetime).toLocaleString()} (n=${n})`;
            return (
              <Cell
                key={i}
                cellStyle="RightDetail"
                title={logName}
                onPress={() => {
                  navigation.navigate("Log", {
                    logKey: logKey,
                    name: logName,
                  });
                }}
                accessory="DisclosureIndicator"
              />
            );
          })}
      </TableView>
      {logKeys.length > 0 && (
        <Button
          title="Clear logs"
          onPress={() => {
            Alert.alert(
              "Are you sure?",
              "This will clear all logs",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "OK",
                  onPress: () => {
                    for (let i = 0; i < logKeys.length; i++) {
                      storage.removeItem(logKeys[i]);
                    }
                    setLogKeys([]);
                  },
                },
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
