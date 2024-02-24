import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const username = 'User Name';
  const email = 'user@example.com';
  const onSettingsPress = () => console.log('Go to settings');
  const onLogoutPress = () => console.log('Log out');

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={require('..\\images\\pfp.jpg')} style={styles.avatar} />
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onSettingsPress} style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogoutPress} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default ProfileScreen;
