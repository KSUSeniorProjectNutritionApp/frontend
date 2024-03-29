import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const OnboardingScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌟 Nutrition App 🌟</Text>
      <Text style={styles.description}>Welcome!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Get nutritional information by scanning items with our app!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF5EE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFB07B',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#5F4B32',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: '#5F4B32',
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

export default OnboardingScreen;
