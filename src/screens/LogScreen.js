import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native";

import { jsonToCSV } from "react-native-csv";

export default ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text>hi</Text>
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
