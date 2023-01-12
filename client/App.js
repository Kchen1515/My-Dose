import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreens.jsx'
import CalculatorScreen from './screens/CalculatorScreen.jsx'
import InitialDetailsScreen from './screens/InitialDetailsScreen.jsx'
import Signup from './screens/Signup.jsx'
import SignIn from './screens/SignIn.jsx'
const Stack = createNativeStackNavigator();
import {Button} from 'react-native-paper'
import { StateContext } from './context/auth.js'

const App = () => {
  return (
    <NavigationContainer>
      <StateContext>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Sign Up" component={Signup}/>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Initial Details" component={InitialDetailsScreen}/>
          <Stack.Screen name="Insulin Calculator" component={CalculatorScreen} />
        </Stack.Navigator>
      </StateContext>
    </NavigationContainer>
  );
}
export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
