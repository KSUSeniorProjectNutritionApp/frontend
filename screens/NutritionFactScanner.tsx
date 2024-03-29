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
        {backgroundColor: index % 2 === 0 ? '#FFF5EE' : '#FFB07B'},
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
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Nutrition Facts</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFF5EE',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FFB07B',
    backgroundColor: '#FFF5EE',
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#FFB07B',
  },
  key: {
    flex: 1,
    fontWeight: 'bold',
    color: '#5F4B32',
    fontSize: 18,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    color: '#5F4B32',
    fontSize: 18,
  },
});

export default NutritionFactScreen;
