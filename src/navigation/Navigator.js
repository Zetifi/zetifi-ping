import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import MapScreen from "../screens/MapScreen";
import LogListScreen from "../screens/LogListScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LogNavigator from "./LogNavigator";
import { COLORS, ICON_SIZE } from "../constants";
import { Context as LogContext } from "../state/LogContext";

const Tab = createMaterialBottomTabNavigator();

const optionFactory = (icon, label) => ({
  tabBarIcon: ({ color }) => (
    <MaterialIcons name={icon} size={ICON_SIZE} color={color} />
  ),
  tabBarLabel: label,
});

export default () => {
  const { isRecording } = React.useContext(LogContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        shifting={true}
        barStyle={{
          backgroundColor: COLORS.zetifiObsidian,
          ...{ display: isRecording ? "none" : "flex" },
        }}
      >
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={optionFactory("map", "Map")}
        />
        <Tab.Screen
          name="LogsNavigator"
          component={LogNavigator}
          options={optionFactory("list", "Logs")}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={optionFactory("settings", "Settings")}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
