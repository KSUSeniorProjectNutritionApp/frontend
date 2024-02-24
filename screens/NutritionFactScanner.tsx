import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const data = [
  {key: 'Product Name', value: 'Placeholder Brand'},
  {key: 'Serving Size', value: '0g'},
  {key: 'Calories', value: '0 kcal'},
  {key: 'Total Fat', value: '0g'},
  {key: 'Saturated Fat', value: '0g'},
  {key: 'Trans Fat', value: '0g'},
  {key: 'Cholesterol', value: '0mg'},
  {key: 'Sodium', value: '0mg'},
  {key: 'Total Carbohydrate', value: '0g'},
  {key: 'Dietary Fiber', value: '0g'},
  {key: 'Total Sugars', value: '0g'},
  {key: 'Added Sugars', value: '0g'},
  {key: 'Protein', value: '0g'},
  {key: 'Vitamin D', value: '0µg'},
  {key: 'Calcium', value: '0mg'},
  {key: 'Iron', value: '0mg'},
  {key: 'Potassium', value: '0mg'},
  // other stuff like specific vitamins and stuff we will implement this once we have an api to call
];

const NutritionFactScreen: React.FC<{navigation: any}> = ({navigation}) => {
  interface NutritionFact {
    key: string;
    value: string;
  }

  const renderItem = ({item, index}: {item: NutritionFact; index: number}) => (
    <View
      style={[
        styles.row,
        {backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0'},
      ]}>
      <Text style={styles.key}>{item.key}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={<Text style={styles.header}>Nutrition Facts</Text>}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  key: {
    fontWeight: 'bold',
  },
  value: {
    textAlign: 'right',
  },
});

export default NutritionFactScreen;
