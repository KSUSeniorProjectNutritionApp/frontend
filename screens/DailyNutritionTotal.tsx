import React, {createContext, useState, useContext, ReactNode} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
    FlatList,
    Button,
    ActivityIndicator,
  } from 'react-native';
import { dailyContext } from './NutritionContext';

const DailyNutrition: React.FC<{}> = ({}) => {
    const [[items, setItems], [nutrients, setNutrients], [amounts, setAmounts], [total, setTotal]] = useContext(dailyContext);
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
    const findEnergy = (nutrients)=>{
        console.log()
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
    const mysum = () => {return amounts.reduce((a, b) => a+b, 0)}
    return (<View style = {styles.headerContainer}>
        <Text style={styles.header}>{`Daily Calories: ${total}`}</Text>
        <FlatList
        data={items}
        renderItem={({item, index}) => (<View style={styles.row}>
            <Text style={styles.textLeft}>{wrapWords(item.description)}</Text>
            <View style={styles.rightrow}>
                <TextInput
                style={styles.input}
                inputMode='numeric'
                onChangeText={(num) => {
                    amounts[index] = Number(num)*findEnergy(nutrients[index])/(item.servingSize || 100)
                    setAmounts(amounts)
                    setTotal(mysum())
                }}
                defaultValue={item.servingSize.toString() || '100'}/>
                <Text style={styles.textRight}>{item.servingSizeUnit || 'g'}</Text>
            </View>
             </View>)}/>
            <TouchableOpacity
            style={styles.scanButton}
            onPress={() => {setItems([])
                setAmounts(amounts)
                setTotal(total)
                
            }}>
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
        fontWeight: 'bold',
        textAlign: 'left',
        // marginVertical: 20,
        color: '#FFB07B',
    },
    textRight: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
        // marginVertical: 20,
        color: '#FFB07B',
    },
    leftItem: {
        flexDirection: 'row',
        borderColor: '#FFB07B',
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        borderWidth: 2,
        borderColor: '#FFB07B',
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

