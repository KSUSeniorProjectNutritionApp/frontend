import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [apiResponse, setApiResponse] = useState(null);
  const handleSearch = (text: string) => {
    console.log('Search for:', text);
  };

  const openScanner = () => {
    console.log('Open Scanner');
    navigation.navigate('Scanner');
  };

  const openProfile = () => {
    console.log('Open Profile');
    navigation.navigate('Profile');
  };

  const testApiCall = async () => {
    try {
      console.log('Starting API call...');
      const response = await fetch('http://ksu.michaelehme.me/barcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({barcode: '1633636543505'}),
      });
      console.log('Fetch completed, processing response...');
      const data = await response.json();
      setApiResponse(data);

      Alert.alert('API Response', JSON.stringify(data, null, 2));
      console.log(2);
    } catch (error) {
      console.error('API call failed:', error);
      Alert.alert('Error', 'Failed to fetch data from API');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>NUTRITION APP</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food items"
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.scanButton} onPress={openScanner}>
        <Text style={styles.scanButtonText}>Scan Barcode 📷</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.scanButton} onPress={testApiCall}>
        <Text style={styles.scanButtonText}>Test API Call</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => console.log('Home')}>
          <Text style={styles.footerText}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Search')}>
          <Text style={styles.footerText}>🔍 Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openScanner}>
          <Text style={styles.footerText}>📸 Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openProfile}>
          <Text style={styles.footerText}>👤 Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FAE5D3',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFB07B',
  },
  searchBar: {
    height: 40,
    width: '80%',
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: '#FAD4C0',
    backgroundColor: '#FFF5EE',
  },
  scanButton: {
    backgroundColor: '#FFB07B',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  scanButtonText: {
    fontSize: 18,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footerText: {
    fontSize: 16,
    color: '#FFB07B',
  },
});

export default HomeScreen;
