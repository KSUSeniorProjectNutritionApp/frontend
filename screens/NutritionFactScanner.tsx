import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const NutritionFactScreen: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const itemInfo = route.params.data;

  const data = [
    {key: 'Product Name', value: itemInfo.description},
    {
      key: 'Serving Size',
      value: `${itemInfo.servingSize} ${itemInfo.servingSizeUnit}`,
    },
    {key: 'Brand Owner', value: itemInfo.brandOwner},
    {key: 'Ingredients', value: itemInfo.ingredients},
    ...itemInfo.foodNutrients.map(nutrient => ({
      key: nutrient.nutrient.name,
      value: `${nutrient.amount} ${nutrient.nutrient.unitName}`,
    })),
  ];

  const renderItem = ({item, index}) => (
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
