import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';

const OnboardingScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌟 Nutriton App 🌟</Text>
      <Text style={styles.description}>Welcome!</Text>

      <View style={styles.buttonContainer}>
        <Button title="LOGIN" onPress={() => navigation.navigate('Login')} />
        <Button title="SIGN UP" onPress={() => navigation.navigate('Signup')} />
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
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
  },
});

export default OnboardingScreen;
