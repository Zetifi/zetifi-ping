import React from "react";

import { EvilIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogListScreen from "../screens/LogListScreen";
import LogScreen from "../screens/LogScreen";
const Stack = createNativeStackNavigator();
import { COLORS } from "../constants";
import { flatten } from "flat";
import * as FileSystem from "expo-file-system";
import { jsonToCSV } from "react-native-csv";
import { Share } from "react-native";
import storage from "../storage";

const onShare = async (log) => {
  const fileName = `export-${log[0].ping.datetime}.csv`;

  let fileUri = `${FileSystem.documentDirectory}${fileName}`;
  let csvContents = jsonToCSV(JSON.stringify(log.map(flatten)));

  await FileSystem.writeAsStringAsync(fileUri, csvContents, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  await Share.share({
    url: fileUri,
  });
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Logs" component={LogListScreen} />
      <Stack.Screen
        name="Log"
        component={LogScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <EvilIcons
              name="share-apple"
              size={25}
              color={COLORS.headerTintColor}
              onPress={() => {
                let log = storage.getMap(route.params.logKey);
                if (log) {
                  onShare(log.data);
                }
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
