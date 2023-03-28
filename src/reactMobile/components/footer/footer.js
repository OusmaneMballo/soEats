import React, { useEffect, useState } from 'react';
import { View, Text,TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { styles } from './footerStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Footer(val){
    const navigation = useNavigation();
    const [numberOfItems, setNumberOfItems]=useState(val);
    if(val>0){
        setNumberOfItems(val);
    }
    const getNumberOfItem = async ()=>{

        const numberOfItems = await AsyncStorage.getItem('numberOfItems');
        let currentnumberOfItems=parseInt(numberOfItems);
        if(currentnumberOfItems>0){
            setNumberOfItems(currentnumberOfItems);
        }
    }
    getNumberOfItem();
    return(
        
        <View style={styles.container}>
            {/* {getNumberOfItem()} */}
            <TouchableWithoutFeedback 
                        onPress = {() =>{
                            navigation.navigate('Restaurants', {getNumberOfItem: getNumberOfItem})
                        } 
                    }
            >
                    <View >
                        <Image
                            style={styles.img}
                            source={require('../../assets/icons/home-pleine.png')}
                        />
                    
                    </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback 
                onPress = {() => navigation.navigate('OrderPage', {getNumberOfItem: getNumberOfItem})
                }
            >
                    <View >
                    {
                    numberOfItems>0 ?
                    <View>
                         <Badge containerStyle={{ position: 'absolute', top: -12, right: 35 }} value={numberOfItems} status="success"/>
                        <Image
                            style={styles.img}
                            source={require('../../assets/icons/panier_pleine.png')}
                        />
                    </View>
                    :
                    <View>
                        <Image
                            style={styles.img}
                            source={require('../../assets/icons/panier_pleine.png')}
                        />
                    </View>
                    }
                    </View>
            </TouchableWithoutFeedback> 
        </View>
    )
}