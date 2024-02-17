import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
//screens!
import BarcodeScanScreen from './screens/BarcodeScanScreen';
import ScannerView from './components/ScannerView';

const App: React.FC = () => {
  return <ScannerView />;
};
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

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
