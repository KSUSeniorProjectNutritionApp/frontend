import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//screens!
import ScannerView from './screens/ScannerView';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerView} />
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
