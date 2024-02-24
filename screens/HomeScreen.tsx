import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
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
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    width: '80%',
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: '#ddd',
  },
  scanButton: {
    backgroundColor: '#007BFF',
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
  },
});

export default HomeScreen;
