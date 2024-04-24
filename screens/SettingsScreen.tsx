import React from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import {useAllergySettings} from './AllergySettingsContext';

const SettingsScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {allergyToggles, setAllergyToggles} = useAllergySettings();

  const toggleAllergy = (allergy: keyof typeof allergyToggles) => {
    setAllergyToggles(prev => ({...prev, [allergy]: !prev[allergy]}));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Allergy Settings</Text>
      {Object.entries(allergyToggles).map(([allergy, isEnabled]) => (
        <View style={styles.settingRow} key={allergy}>
          <Text>{allergy.charAt(0).toUpperCase() + allergy.slice(1)}</Text>
          <Switch
            trackColor={{false: '#767577', true: '#FFB07B'}}
            thumbColor={isEnabled ? '#FFF5EE' : '#f4f3f4'}
            onValueChange={() =>
              toggleAllergy(allergy as keyof typeof allergyToggles)
            }
            value={isEnabled}
          />
        </View>
      ))}
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FAE5D3',
    borderRadius: 10,
  },
});

export default SettingsScreen;
