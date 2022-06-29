import React, { useContext } from "react";
import { StyleSheet, ScrollView, TextInput } from "react-native";
import { Context as SettingsContext } from "../state/SettingsContext";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import NumericInput from "react-native-numeric-input";

const TextCellInput = ({ title, value, onChange }) => {
  return (
    <Cell
      title={title}
      cellAccessoryView={
        <TextInput
          style={{ fontSize: 16, flex: 1, textAlign: "right" }}
          value={value}
          onChangeText={onChange}
        />
      }
    />
  );
};

const NumericInputCell = ({ title, value, onChange, disabled = false }) => {
  return (
    <Cell
      title={title}
      cellAccessoryView={
        <NumericInput
          editable={!disabled}
          step={100}
          value={value}
          onChange={onChange}
          borderColor={"rgba(0,0,0,0)"}
          rounded={true}
          totalWidth={100}
          minValue={10}
          maxValue={9999}
        />
      }
    />
  );
};

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

export default () => {
  const settings = useContext(SettingsContext);
  return (
    <ScrollView style={styles.container}>
      <TableView>
        <Section header="Ping Settings">
          <TextCellInput
            title="Host"
            value={settings.ping.host}
            onChange={settings.setPingHost}
          />
          <NumericInputCell
            title={"Interval (ms)"}
            value={settings.ping["interval"]}
            onChange={settings.setPingInterval}
          />
          <NumericInputCell
            title={"Timeout (ms)"}
            value={settings.ping["timeout"]}
            onChange={settings.setPingTimeout}
          />
          <DisabledInputCell
            title={"Packet Size (bytes)"}
            value={settings.ping["packetSize"]}
            onChange={settings.setPingPacketSize}
            disabled={true}
          />
        </Section>
        <Section header="GPS Settings">
          <NumericInputCell
            title={"Interval (ms)"}
            value={settings.location["interval"]}
            onChange={settings.setLocationInterval}
          />
        </Section>
      </TableView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});
