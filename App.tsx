import "./global.css";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import Auth from "./Auth";
import UsersPage from "./UsersPage";

const Stack = createNativeStackNavigator();

const navTheme = {
  dark: true,
  colors: {
    primary: "#2563eb",
    background: "#111827",
    card: "#111827",
    text: "#f9fafb",
    border: "#374151",
    notification: "#3b82f6",
  },
  fonts: {
    regular: { fontFamily: "System", fontWeight: "400" as "400" },
    medium: { fontFamily: "System", fontWeight: "500" as "500" },
    bold: { fontFamily: "System", fontWeight: "700" as "700" },
    heavy: { fontFamily: "System", fontWeight: "900" as "900" },
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#111827" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Users" component={UsersPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
