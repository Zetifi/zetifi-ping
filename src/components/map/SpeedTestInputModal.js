import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { Context as SettingsContext } from "../../state/SettingsContext";
import { Context as LogContext } from "../../state/LogContext";

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

export default () => {
  const settings = useContext(SettingsContext);
  const { setAdhocLog } = useContext(LogContext);
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);

  const saveAdocLog = () => {
    setAdhocLog({
      downloadSpeed: downloadSpeed,
      uploadSpeed: uploadSpeed,
      datetime: new Date().toISOString(),
    });
    setDownloadSpeed(null);
    setUploadSpeed(null);

    settings.setSpeedTestModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={settings.speedTestModal.visible}
      >
        <View style={styles.modalView}>
          <TableView>
            <Section header="Speed Test Data Input">
              <TextCellInput
                title="Download (Mbps)"
                value={downloadSpeed}
                onChange={setDownloadSpeed}
              />
              <TextCellInput
                title="Upload (Mbps)"
                value={uploadSpeed}
                onChange={setUploadSpeed}
              />
            </Section>
          </TableView>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalActionButton}
              onPress={saveAdocLog}
              disabled={!downloadSpeed || !uploadSpeed}
            >
              <Text style={styles.modalActionButtonText}>Save</Text>
            </TouchableOpacity>
            <View style={{ width: 10 }}></View>
            <TouchableOpacity
              style={{
                ...styles.modalActionButton,
                backgroundColor: "#f44336",
              }}
              onPress={() => {
                setDownloadSpeed(null);
                setUploadSpeed(null);
                settings.setSpeedTestModalVisible(false);
              }}
            >
              <Text style={styles.modalActionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 30,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    width: "100%",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginLeft: 10,
    spaceBetween: 10,
  },
  modalActionButton: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  modalActionButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
