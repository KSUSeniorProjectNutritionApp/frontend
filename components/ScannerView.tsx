import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Text,
  Button,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

function ScannerView() {
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes} codes!`);
      codes.forEach(code => {
        console.log(`Code Type: ${code.value}`);
      });
    },
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  if (device == null) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Point your camera at a barcode to scan it.
      </Text>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      </View>
      <View style={styles.backButtonContainer}>
        <Button title="Back" onPress={() => console.log('back')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },
  cameraContainer: {
    marginTop: '15%',
    width: '80%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButtonContainer: {
    marginTop: '100%',
  },
});

export default ScannerView;
