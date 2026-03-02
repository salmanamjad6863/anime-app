import "./global.css"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text className="text-xl font-bold text-blue-500 text-center">Open up App.tsx to start working on your app! aaa</Text>
      <StatusBar style="auto" />
    </View>
  );
}


