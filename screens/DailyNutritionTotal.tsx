import React, {useContext} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    FlatList,
  } from 'react-native';
import { dailyContext } from './NutritionContext';

const DailyNutrition: React.FC<{navigation: any}> = ({navigation}) => {
    const [[items, setItems], [nutrients, setNutrients],[amounts, setAmounts],[total, setTotal],[amountP, setAmountsP],[totalP, setTotalP],[amountC, setAmountsC],[totalC, setTotalC],[amountF, setAmountsF],[totalF, setTotalF]] = useContext(dailyContext);
    const wrapWords = (text:string) => {
        if (text.length > 20) {
            let words = text.split(' ')
            let result = ''
            let temp = ''
            for(let i = 0; i < words.length; i++) {
                if (temp.length > 20) {
                    result = result + '\n' + words[i]
                    temp = words[i]
                    continue
                }
                temp = temp + ' ' + words[i]
                result = result + ' ' + words[i]
            }
            return result.slice(1)
        }
        return text
    }

    const findCarbs = (nutrients) => {
        let simplify = nutrients.map(element => {
          return [element.amount, element.nutrient.name]
      })
  
      for (let step = 0; step < simplify.length; step++) {
        [num, name] = simplify[step]
        if (name.toUpperCase().includes('CARBO')) {
            return num
        }
      }
      return 0;
    }
  
    const findFat = (nutrients) => {
      let simplify = nutrients.map(element => {
        return [element.amount, element.nutrient.name]
    })
  
    for (let step = 0; step < simplify.length; step++) {
      [num, name] = simplify[step]
      if (name.toUpperCase().includes('FAT')) {
          return num
      }
    }
    return 0;
  }
  
  const findProtein = (nutrients) => {
      let simplify = nutrients.map(element => {
        return [element.amount, element.nutrient.name]
    })
  
    for (let step = 0; step < simplify.length; step++) {
      [num, name] = simplify[step]
      if (name.toUpperCase().includes('PROTEIN')) {
          return num
      }
    }
    return 0;
  }
    const findEnergy = (nutrients)=>{
        let simplify = nutrients.map(element => {
            return [element.amount, element.nutrient.name]
        })
        
        for (let step = 0; step < simplify.length; step++) {
            [num, name] = simplify[step]
            if (name == 'Energy') {
                return num
            }
        }
        return 0;
    }
    const mysum = (myamounts) => {try {
        return myamounts.reduce((a, b) => a+b, 0) }
        catch (error) {
            console.log(error)
            return 0
        }
    }
    return (<View style = {styles.headerContainer}>
        <Text style={styles.header}>{`Daily Calories: ${total.toFixed(2)}`}</Text>
        <Text style={styles.header}>{`Daily Carbohydrates: ${totalC.toFixed(2)}`}</Text>
        <Text style={styles.header}>{`Daily Fat: ${totalF.toFixed(2)}`}</Text>
        <Text style={styles.header}>{`Daily Protein: ${totalP.toFixed(2)}`}</Text>

        <FlatList
        data={items}
        renderItem={({item, index}) => (<View style={styles.row}>
            <TouchableOpacity style={styles.textLeft} onPress={
                () => navigation.navigate('Nutrition', {data: item})
            }>
                <Text style={styles.textLeft}>{wrapWords(item.description)}</Text>
            </TouchableOpacity>
            <View style={styles.rightrow}>
                <TextInput
                style={styles.input}
                inputMode='numeric'
                onChangeText={(num) => {
                    // console.log(num, findEnergy(nutrients[index]), item.servingSize)
                    const energy = findEnergy(nutrients[index])
                    const fat = findFat(nutrients[index])
                    const carb = findCarbs(nutrients[index])
                    const protein = findProtein(nutrients[index])

                    const adjusted = (value) => {return value/100*(item.servingSize || 100)}
                    // console.log(energy, adjusted(energy))
                    amounts[index] = Number(num)*adjusted(energy)/(item.servingSize || 100)
                    amountP[index] = Number(num)*adjusted(protein)/(item.servingSize || 100)
                    amountC[index] = Number(num)*adjusted(carb)/(item.servingSize || 100)
                    amountF[index] = Number(num)*adjusted(fat)/(item.servingSize || 100)
                    console.log(amounts[index])
                    setAmounts(amounts)
                    setAmountsC(amountC)
                    setAmountsF(amountF)
                    setAmountsP(amountP)
                    setTotal(mysum(amounts))
                    setTotalC(mysum(amountC))
                    setTotalF(mysum(amountF))
                    setTotalP(mysum(amountP))

                }}
                defaultValue={item.servingSize.toString() || '100'}/>
                <Text style={styles.textRight}>{item.servingSizeUnit || 'g'}</Text>
            </View>
             </View>)}/>
            <TouchableOpacity
            style={styles.scanButton}
            onPress={() => {setItems([])
                setNutrients([])
                setAmounts([])
                setAmountsC([])
                setAmountsF([])
                setAmountsP([])
                setTotal(0)
                setTotalC(0)
                setTotalF(0)
                setTotalP(0)
                console.log(items, nutrients, amounts, total)}
                }>
                <Text style= {styles.scanButtonText}>Clear list</Text>
            </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: '#FFF5EE',
    //   paddingVertical: 10,
    //   paddingHorizontal: 10,
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
    textLeft: {
        fontSize: 15,
        // fontWeight: 'bold',
        textAlign: 'left',
        // marginVertical: 20,
        color: '#333',
    },
    textRight: {
        fontSize: 15,
        // fontWeight: 'bold',
        textAlign: 'right',
        // marginVertical: 20,
        color: '#333',
    },
    leftItem: {
        flexDirection: 'row',
        borderColor: '#FFB07B',
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        borderTopWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    rightrow: {
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'flex-end',
      borderWidth: 0,
      borderColor: '#FFB07B',
      alignItems: 'center',
    },
    input: {
        height: 40,
        width: '40%',
        marginVertical: 20,
        marginRight: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#FAD4C0',
        backgroundColor: '#FFF5EE',
        color: '#000',
        textAlign: 'right'
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
    scanButton: {
        backgroundColor: '#FFB07B',
        padding: 20,
        borderRadius: 20,
        marginTop: 20,
        marginHorizontal: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    
      },
      scanButtonText: {
        fontSize: 18,
        color: 'white',
      },
  });

export default DailyNutrition;

