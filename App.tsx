import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//screens!
import ScannerView from './screens/ScannerView';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import NutritionFactScreen from './screens/NutritionFactScanner';
import SettingsScreen from './screens/SettingsScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import {LoginScreen, SignupScreen} from './screens/LoginSignupScreen';
//little notes!
/*
npx react-native start --reset-cache
  the --reset-cache tag fixes like 70% of all of the errors i run into
*/

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Nutrition" component={NutritionFactScreen} />
        <Stack.Screen name="Scanner" component={ScannerView} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*const App: React.FC = () => {
  return <HomeScreen />;
};*/
/*const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Filler for now! This is where I will put my components, this is the app
        navigator
      </Text>
    </SafeAreaView>
  );
};*/

/*const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});*/

export default App;
