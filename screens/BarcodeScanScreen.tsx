import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import ScannerView from '../components/ScannerView';

const BarcodeScanScreen: React.FC = () => {
  const handleBarcodeScanned = (barcodeData: any) => {
    Alert.alert('Barcode scanned: ${barcodeData.data}');
  };

  return (
    <View>
      <Text></Text>
      <ScannerView onBarcodeScanned={handleBarcodeScanned} />
      <Button
        title="Back to Home"
        onPress={() =>
          console.log(
            'would take back to home, will implement that once home screen is finished',
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {fontSize: 20, marginBottom: 20},
});

export default BarcodeScanScreen;
