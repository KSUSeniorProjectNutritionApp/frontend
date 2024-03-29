import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const username = 'User Name';
  const email = 'user@example.com';
  const onSettingsPress = () => {
    console.log('Go to settings');
    navigation.navigate('Settings');
  };
  const onLogoutPress = () => {
    console.log('Log out');
    // This will reset the navigation stack and navigate to the Onboarding screen
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Onboarding'}],
      }),
    );
  };

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
    backgroundColor: '#FFF5EE',
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
    borderWidth: 3,
    borderColor: '#FFB07B',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFB07B',
  },
  email: {
    fontSize: 18,
    color: '#A2543D',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#FFB07B',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF5EE',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
