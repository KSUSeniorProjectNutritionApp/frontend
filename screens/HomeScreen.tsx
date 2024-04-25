import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const testApiCall = async () => {
    setIsLoading(true);
    try {
      console.log('Starting API call...');
      const response = await fetch('http://ksu.michaelehme.me/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({keywords: searchText, hits: 5}),
      });
      const data = await response.json();
      setIsLoading(false);
      if (data && data.length > 0) {
        setSearchResults(data);
      } else {
        Alert.alert('No results found');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('API call failed:', error);
      Alert.alert('Error', 'Failed to fetch data from API');
    }
  };

  const openScanner = () => {
    console.log('Open Scanner');
    navigation.navigate('Scanner');
  };

  const openProfile = () => {
    console.log('Open Profile');
    navigation.navigate('Profile');
  };

  const renderSearchResult = ({item}) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate('Nutrition', {data: item})}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.company}>{item.brandOwner}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>NUTRITION APP</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food items"
        placeholderTextColor={'#808080'}
        value={searchText}
        onChangeText={handleSearch}
        editable={!isLoading}
      />
      <TouchableOpacity
        style={styles.scanButton}
        onPress={testApiCall}
        disabled={isLoading}>
        <Text style={styles.scanButtonText}>Search 🔍</Text>
        {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
      </TouchableOpacity>
      <FlatList
        data={searchResults}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => navigation.navigate('Nutrition', {data: item})}
            disabled={isLoading}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.company}>{item.brandOwner}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.fdcId.toString()}
      />
      <TouchableOpacity
        style={styles.scanButton}
        onPress={openScanner}
        disabled={isLoading}>
        <Text style={styles.scanButtonText}>Scan Barcode 📷</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('Settings')}
        disabled={isLoading}>
        <Text style={styles.scanButtonText}>Allergy Settings ⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

/* No api for profiles, so no navigation to profile screens needed
<View style={styles.footer}>
        <TouchableOpacity
          onPress={() => console.log('Home')}
          disabled={isLoading}>
          <Text style={styles.footerText}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={testApiCall} disabled={isLoading}>
          <Text style={styles.footerText}>🔍 Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Scanner')}
          disabled={isLoading}>
          <Text style={styles.footerText}>📸 Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          disabled={isLoading}>
          <Text style={styles.footerText}>👤 Profile</Text>
        </TouchableOpacity>
      </View>
*/

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
    color: '#000'
  },
  scanButton: {
    backgroundColor: '#FFB07B',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  company: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
