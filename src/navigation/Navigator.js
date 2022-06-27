import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import MapScreen from "../screens/MapScreen";
import LogScreen from "../screens/LogScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { COLORS, ICON_SIZE } from "../constants";
import { Context as LogContext } from "../state/LogContext";

const Tab = createMaterialBottomTabNavigator();

const optionFactory = (icon, label) => ({
  tabBarIcon: ({ color }) => (
    <MaterialIcons name={icon} size={ICON_SIZE} color={color} />
  ),
  tabBarLabel: label,
});

export default function App() {
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
          name="Logs"
          component={LogScreen}
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
}