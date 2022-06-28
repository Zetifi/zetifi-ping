import React, { useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions, ScrollView, Share } from "react-native";
import { Context as LogContext } from "../state/LogContext";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { COLORS } from "../constants";
import { EvilIcons } from "@expo/vector-icons";
import { flatten } from "flat";
import * as FileSystem from "expo-file-system";

import { jsonToCSV } from "react-native-csv";

const onShare = async (log) => {
  const fileName = `export-${log[0].location.datetime}.csv`;

  let fileUri = `${FileSystem.documentDirectory}${fileName}`;
  let csvContents = jsonToCSV(JSON.stringify(log.map(flatten)));

  try {
    await FileSystem.writeAsStringAsync(fileUri, csvContents, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (e) {
    console.log(e);
  }

  const result = await Share.share({
    url: fileUri,
  });
};

export default () => {
  const { logs } = useContext(LogContext);

  return (
    <ScrollView style={styles.container}>
      <TableView>
        <Section header="Recordings">
          {logs
            .filter((log) => log.length > 0)
            .sort((a, b) => {
              return (
                new Date(b[0].location.datetime) -
                new Date(a[0].location.datetime)
              );
            })
            .map((log, i) => (
              <Cell
                key={i}
                cellStyle="RightDetail"
                title={`${new Date(
                  log[0].location.datetime
                ).toLocaleString()} (n=${log.length})`}
                cellAccessoryView={
                  <EvilIcons
                    name="share-apple"
                    size={25}
                    color={COLORS.zetifiObsidian}
                  />
                }
                onPress={() => {
                  onShare(log);
                }}
              />
            ))}
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
