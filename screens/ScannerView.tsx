import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

interface ApiResponse {
  fdcId: number;
  description: string;
  foodNutrients: Array<{
    id: number;
    nutrient: {
      id: number;
      name: string;
      unitName: string;
    };
    amount: number;
  }>;
  brandOwner: string;
  gtinUpc: string;
  ingredients: string;
  servingSize: number;
  servingSizeUnit: string;
}

const ScannerView: React.FC<{navigation: any}> = ({navigation}) => {
  const device = useCameraDevice('back');
  const [isScanned, setIsScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const apiCall = async (itemBarCode: string) => {
    setIsLoading(true);
    try {
      console.log('Starting API call...');
      const response = await fetch('http://ksu.michaelehme.me/barcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({barcode: itemBarCode}),
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      const data: ApiResponse = await response.json();
      setApiResponse(data);
      console.log('Item Description:', data.description);
      //Alert.alert('API Response', data.description);
      navigation.navigate('Nutrition', {data: data});
      //return data;
    } catch (error) {
      console.error('API call failed:', error);
      Alert.alert('Scan Error', 'Failed to fetch item data, please try again.');
      setIsScanned(false);
    } finally {
      setIsScanned(false);
      setIsLoading(false);
    }
  };

  const confirmBarcode = (barcodeValue: string) => {
    Alert.alert(
      'Confirm Barcode',
      `Is this the correct barcode: ${barcodeValue}?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Barcode confirmation canceled.');
            setIsScanned(false);
          },
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            apiCall(barcodeValue);
          },
        },
      ],
    );
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (!isScanned && codes.length > 0) {
        setIsScanned(true);
        const code = codes[0];
        confirmBarcode(code.value);
      }
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
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFB07B" />
          </View>
        )}
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
  loadingOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  /**backButtonContainer: {
    marginTop: '100%',
  },**/
});

export default ScannerView;
