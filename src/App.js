import Providers from "./Providers";
import Map, { ActionBar } from "./components/map";
import WatchLocation from "./watchers/watchLocation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "./constants";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";

import MapScreen from "./screens/MapScreen";
import LogScreen from "./screens/LogScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createMaterialBottomTabNavigator();

const optionFactory = (icon, label) => ({
  tabBarIcon: ({ color }) => (
    <MaterialIcons name={icon} size={25} color={color} />
  ),
  tabBarLabel: label,
  tabBarStyle: {
    display: "none",
  },
});

export default function App() {
  return (
    <Providers>
      <WatchLocation />
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
            shifting={true}
            barStyle={{ backgroundColor: COLORS.zetifiObsidian }}
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
      </SafeAreaProvider>
    </Providers>
  );
}
