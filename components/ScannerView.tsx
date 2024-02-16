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
    <View>
      <RNCamera
        onBarCodeRead={handleBarCodeRead}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      />
    </View>
  );
};

export default ScannerView;
