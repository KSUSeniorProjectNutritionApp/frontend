import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {useAllergySettings} from './AllergySettingsContext';

const NutritionFactScreen: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {allergyToggles} = useAllergySettings();
  const itemInfo = route.params.data;

  const allergens = {
    MILK: [
      'BUTTER',
      'BUTTERMILK',
      'CASEIN',
      'CASEIN HYDROLYSATE',
      'CASEINATES',
      'CHEESE',
      'COTTAGE CHEESE',
      'CREAM',
      'CURDS',
      'CUSTARD',
      'GHEE',
      'HALF-AND-HALF',
      'HALF AND HALF',
      'LACTALBUMIN',
      'LACTALBUMIN PHOSPHATE',
      'LACTIC ACID STARTER CULTURE',
      'LACTOFERRIN',
      'LACTOGLOBULIN',
      'LACTOSE',
      'LACTULOSE',
      'MILK',
      'PUDDING',
      'RECALDENT',
      'RENNET CASEIN',
      'SIMPLESSE',
      'SOUR CREAM',
      'TAGATOSE',
      'WHEY',
      'YOGURT',
    ],
    EGGS: [
      'ALBUMIN',
      'ALBUMEN',
      'APOVITELLIN',
      'AVIDIN GLOBULIN',
      'EGG',
      'EGGNOG',
      'LYSOZYME',
      'MAYONNAISE',
      'MERINGUE',
      'OVALBUMIN',
      'OVOMUCOID',
      'OVOMUCIN',
      'OVOVITELLIN',
      'SURIMI',
      'VITELLIN',
    ],
    FISH: [
      'ANCHOVIES',
      'BASS',
      'CATFISH',
      'COD',
      'FLOUNDER',
      'GROUPER',
      'HADDOCK',
      'HAKE',
      'HALIBUT',
      'HERRING',
      'MAHI',
      'PERCH',
      'PIKE',
      'POLLOCK',
      'SALMON',
      'SCROD',
      'SOLE',
      'SNAPPER',
      'SWORDFISH',
      'TILAPIA',
      'TROUT',
      'TUNA',
    ],
    SHELLFISH: [
      'BARNACLE',
      'CRAB',
      'CRAWFISH',
      'CRAWDAD',
      'CRAYFISH',
      'ECREVISSE',
      'KRILL',
      'LOBSTER',
      'LANGOUSTE',
      'LANGOUSTINE',
      'MORETON BAY BUGS',
      'SCAMPI',
      'TOMALLEY',
      'PRAWNS',
      'SHRIMP',
      'CREVETTE',
      'SCAMPI',
      'ABALONE',
      'CLAMS',
      'CHERRYSTONE',
      'GEODUCK',
      'LITTLENECK',
      'PISMO',
      'QUAHO',
      'COCKLE',
      'CUTTLEFISH',
      'LIMPET',
      'LAPAS',
      'OPIHI',
      'MUSSELS',
      'OCTOPUS',
      'OYSTERS',
      'PERIWINKLE',
      'SEA CUCUMBER',
      'SEA URCHIN',
      'SCALLOPS',
      'SNAILS',
      'ESCARGOT',
      'SQUID',
      'CALAMARI',
      'WHELK',
      'TURBAN SHELL',
      'BOUILLABAISSE',
      'CUTTLEFISH INK',
      'GLUCOSAMINE',
      'FISH STOCK',
      'SEAFOOD FLAVORING',
      'CRAB',
      'CLAM',
      'FISH SAUCE',
      'KRILL',
      'SURIMI',
    ],
    TREE_NUTS: [
      'ALMOND',
      'ARTIFICIAL NUTS',
      'BEECHNUT',
      'WALNUT',
      'BRAZIL NUT',
      'BUTTERNUT',
      'CASHEW',
      'CHESTNUT',
      'CHINQUAPIN',
      'COCONUT',
      'FILBERT',
      'HAZELNUT',
      'GIANDUJA',
      'GINKGO',
      'HICKORY NUT',
      'LITCHI',
      'LICHEE',
      'LYCHEE',
      'MACADAMIA',
      'MARZIPAN',
      'ALMOND',
      'NANGAI',
      'NATURAL NUT EXTRACT',
      'NUT BUTTER',
      'NUT MEAL',
      'NUT MEAT',
      'NUT MILK',
      'NUT OIL',
      'NUT PASTE',
      'NUT PIECES',
      'PECAN',
      'PESTO',
      'PILI',
      'PINE',
      'INDIAN',
      'PIGNOLI',
      'PIGNON',
      'PINYON',
      'PISTACHIO',
      'PRALINE',
      'SHEA',
      'WALNUT',
    ],
    PEANUTS: [
      'ARACHIS OIL',
      'ARTIFICIAL NUTS',
      'BEER NUTS',
      'GROUND NUTS',
      'LUPIN',
      'LUPINE',
      'MANDELONAS',
      'MIXED NUTS',
      'MONKEY NUTS',
      'NUT MEAT',
      'NUT MEAL',
      'NUT PIECES',
      'PEANUT',
      'PEANUTS',
      'PEANUT BUTTER',
    ],
    WHEAT: [
      'BREAD CRUMBS',
      'BULGUR',
      'CEREAL EXTRACT',
      'CLUB WHEAT',
      'COUSCOUS',
      'CRACKER MEAL',
      'DURUM',
      'EINKORN',
      'EMMER',
      'FARINA',
      'FARRO',
      'FLOUR',
      'FREEKEH',
      'KAMUT',
      'MATZOH',
      'MATZOH MEAL',
      'MATZO',
      'MATZAH',
      'MATZA',
      'PASTA',
      'SEITAN',
      'SEMOLINA',
      'SPELT',
      'TRITICALE',
      'WHEAT',
    ],
    SOY: [
      'EDAMAME',
      'MISO',
      'NATTO',
      'OKARA',
      'SHOYU',
      'SOY',
      'SOYA',
      'TAMARI',
      'TEMPEH',
      'TEXTURED VEGETABLE PROTEIN',
      'TVP',
      'TOFU',
    ],
  };

  useEffect(() => {
    try {
      checkForAllergens(itemInfo.ingredients.split(', '));
    } catch (err) {
      checkForAllergens(itemInfo.description.toUpperCase().split(', '));
    }
  }, []);

  const checkForAllergens = ingredientsList => {
    let foundAllergens = [];
    for (const [a, isEnabled] of Object.entries(allergyToggles)) {
      const allergy = a.toUpperCase();
      if (isEnabled) {
        const allergenList = allergens[allergy];
        if (
          allergenList.some(allergen =>
            ingredientsList.some(ingredient => ingredient.includes(allergen)),
          )
        ) {
          foundAllergens.push(allergy.toLowerCase());
        }
      }
    }
    if (foundAllergens.length > 0) {
      Alert.alert(
        'Allergy Warning',
        `This product may contain: ${foundAllergens.join(', ')}.`,
      );
    }
  };

  const data = [
    {key: 'Product Name', value: itemInfo.description},
    {
      key: itemInfo.servingSize ? 'Serving Size': 'Base Measurement',
      value: `${itemInfo.servingSize || '100'} ${itemInfo.servingSizeUnit || 'g'}`,
    },
    {key: 'Brand Owner', value: itemInfo.brandOwner || 'NA'},
    {key: 'Ingredients', value: itemInfo.ingredients || itemInfo.description},
    ...itemInfo.foodNutrients.map(nutrient => ({
      key: nutrient.nutrient.name,
      value: `${nutrient.amount/100*(itemInfo.servingSize || 100)} ${nutrient.nutrient.unitName}`,
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
