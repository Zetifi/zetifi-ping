import React from "react";
import { StyleSheet, ScrollView, TextInput } from "react-native";
import { Text } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

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

export default ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TableView>
        <Section header="Log Statistics">
          <DisabledInputCell title="Ping Interval" value={"test"} />
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
});
