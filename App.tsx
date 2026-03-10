import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './Auth'; // Your code above
import UsersPage from './UsersPage'; // Create this

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Auth}  options={{ headerShown: false }}  />
        <Stack.Screen name="Users" component={UsersPage}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
