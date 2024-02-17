import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import ScannerView from '../components/ScannerView';

const BarcodeScanScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Point your camera at a QR code or barcode to scan it.
      </Text>
      <ScannerView />
      <Button title="Back" onPress={() => console.log('back')} />
    </View>
  );
};
//navigation.goBack() button onpress
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
  },
});

export default BarcodeScanScreen;
