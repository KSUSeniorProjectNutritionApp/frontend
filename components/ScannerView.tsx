import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RNCamera, BarCodeReadEvent, RNCameraProps} from 'react-native-camera';

interface ScannerViewProp {
  onBarcodeScanned: (event: BarCodeReadEvent) => void;
}

const ScannerView: React.FC<ScannerViewProp> = ({onBarcodeScanned}) => {
  const handleBarCodeRead = (event: BarCodeReadEvent) => {
    onBarcodeScanned(event);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.scanner}
        onBarCodeRead={handleBarCodeRead}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row'},
  scanner: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
});

export default ScannerView;
