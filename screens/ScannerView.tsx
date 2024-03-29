import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Text,
  Button,
  Alert,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

const ScannerView: React.FC<{navigation: any}> = ({navigation}) => {
  const device = useCameraDevice('back');
  const [isScanned, setIsScanned] = useState(false);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (!isScanned && codes.length > 0) {
        setIsScanned(true);
        const code = codes[0];
        Alert.alert(
          'Item Scanned',
          `An item has been scanned with barcode: ${code.value}`, //this will be replaced with item name
          [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed');
                setIsScanned(false);
              },
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => {
                navigation.navigate('Nutrition');
                setIsScanned(false);
              },
            },
          ],
          {cancelable: false},
        );
      }
      /*codes.forEach(code => {
        console.log(`Code Type: ${code.value}`);
      });*/
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

  if (device == null) {
    console.log('!!!');
    return <View style={styles.container} />;
  }

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
    </View>
  );
};

/*
removed button because adding navigator stack added a button by default i love navigator!
<View style={styles.backButtonContainer}>
  <Button title="Back" onPress={() => console.log('back')} />
</View>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: '#FFF5EE',
  },
  cameraContainer: {
    marginTop: '15%',
    width: '80%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#FFB07B',
    borderWidth: 2,
    // iOS shadow properties:
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android elevation:
    elevation: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFB07B',
  },
  /**backButtonContainer: {
    marginTop: '100%',
  },**/
});

export default ScannerView;
