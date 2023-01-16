import { StyleSheet, Text, View } from 'react-native';
import { StateContext } from './context/auth.js'
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Splash from './screens/Splash.jsx'
import Signup from './screens/Signup.jsx'
import SignIn from './screens/SignIn.jsx'
import HomeScreen from './screens/HomeScreens.jsx'
import InitialDetailsScreen from './screens/InitialDetailsScreen.jsx'
import CalculatorScreen from './screens/CalculatorScreen.jsx'
import Log from './screens/Log.jsx'
import {Button} from 'react-native-paper'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StateContext>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash}/>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Sign Up" component={Signup}/>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Initial Details" component={InitialDetailsScreen}/>
          <Stack.Screen name="Insulin Calculator" component={CalculatorScreen} />
          <Stack.Screen name="Log" component={Log}/>
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
