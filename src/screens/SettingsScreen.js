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

const NumericInputCell = ({
  title,
  value,
  onChange,
  maxValue = 30000,
  minValue = 10,
  step = 100,
}) => {
  return (
    <Cell
      title={title}
      cellAccessoryView={
        <NumericInput
          step={step}
          value={value}
          onChange={onChange}
          borderColor={"rgba(0,0,0,0)"}
          rounded={true}
          totalHeight={40}
          totalWidth={150}
          minValue={minValue}
          maxValue={maxValue}
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
          <NumericInputCell
            title={"Number of Pings"}
            value={settings.ping["numberOfPings"]}
            onChange={settings.setPingNumberOfPings}
            maxValue={1000}
            minValue={1}
            step={1}
          />
          <NumericInputCell
            title={"Payload Size (bytes)"}
            value={settings.ping["payloadSize"]}
            onChange={settings.setPingPayloadSize}
            maxValue={65500}
            minValue={1}
            step={56}
          />
        </Section>
        <Section header="GPS Settings">
          <DisabledInputCell
            title={"Enable High Accuracy"}
            value={settings.location["enableHighAccuracy"]}
          />
          <NumericInputCell
            title={"Timeout (ms)"}
            value={settings.location["timeout"]}
            onChange={settings.setLocationTimeout}
          />
          <NumericInputCell
            title={"Maximum Age (ms)"}
            value={settings.location["maximumAge"]}
            onChange={settings.setLocationMaximumAge}
          />
          <NumericInputCell
            title={"Distance Filter (meters)"}
            value={settings.location["distanceFilter"]}
            onChange={settings.setLocationDistanceFilter}
            minValue={0}
          />
        </Section>
      </TableView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});
