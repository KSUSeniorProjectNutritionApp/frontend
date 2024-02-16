import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
//will import screens as finished!

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Filler for now! This is where I will put my components, this is the app
        navigator
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
