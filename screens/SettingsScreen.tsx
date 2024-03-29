import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Switch,
} from 'react-native';

const SettingsScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] =
    useState(false);
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] =
    useState(false);

  const toggleDarkMode = () =>
    setIsDarkModeEnabled(previousState => !previousState);
  const togglePushNotifications = () =>
    setIsPushNotificationsEnabled(previousState => !previousState);
  const toggleEmailNotifications = () =>
    setIsEmailNotificationsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <TouchableOpacity onPress={() => console.log('Edit Profile')}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Change Password')}>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingRow}>
          <Text>Push Notifications</Text>
          <Switch
            trackColor={styles.switchStyle.trackColor}
            thumbColor={styles.switchStyle.thumbColor}
            onValueChange={togglePushNotifications}
            value={isPushNotificationsEnabled}
          />
        </View>
        <View style={styles.settingRow}>
          <Text>Email Notifications</Text>
          <Switch
            trackColor={styles.switchStyle.trackColor}
            thumbColor={styles.switchStyle.thumbColor}
            onValueChange={toggleEmailNotifications}
            value={isEmailNotificationsEnabled}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>
        <View style={styles.settingRow}>
          <Text>Dark Mode</Text>
          <Switch
            trackColor={styles.switchStyle.trackColor}
            thumbColor={styles.switchStyle.thumbColor}
            onValueChange={toggleDarkMode}
            value={isDarkModeEnabled}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        <TouchableOpacity onPress={() => console.log('FAQs')}>
          <Text>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Contact Us')}>
          <Text>Contact Us</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity onPress={() => console.log('Terms of Service')}>
          <Text>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Privacy Policy')}>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
        <Text>Version: 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF5EE',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFB07B',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFB07B',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FAE5D3',
    borderRadius: 10,
  },
  switchStyle: {
    trackColor: {false: '#767577', true: '#FFB07B'},
    thumbColor: '#FFF5EE',
  },
});
export default SettingsScreen;
