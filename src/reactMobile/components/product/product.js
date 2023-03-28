import React, { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GLOBAL } from "../../environnement/constantes";
import { styles } from './productStyle';
import { View, Text, Image, TouchableOpacity, Animated, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Product(props){
    const navigation = useNavigation();
    const [orderProductItem, setOrderProductItem] = useState();
    const [increment, setIncrement] = useState(0);
    const [enableButton, setEnableButton] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        setOrderProductItem(props.route.params.data.OrderProductItem)
        setIncrement(props.route.params.data.OrderProductItem.Quantity)
    }, [])

    const reset = ()=>{
        setEnableButton(false);
        setShowPopup(true);
        setTimeout(()=>{
            setShowPopup(false);
        }, 1000);
    }

    const addPanier = async(orderItem)=>{

        try {

            const localBag = await AsyncStorage.getItem(GLOBAL.Variables.order);
            const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
            const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
            let currentTotalPrice = parseInt(localTotalPrice);
            let currentnumberOfItems = parseInt(numberOfItems);
            let currentBag = JSON.parse(localBag);

            if (currentBag === null){

                let newbag = {
                    menus: [],
                    orderMenuItem: [],
                    orderItem: [],
                    products: [],
                    montant: 0
                };

                orderItem.id = 1
                orderItem.Quantity = increment>0 ?increment:1;
                newbag.orderItem.push(orderItem);
                newbag.products.push(orderItem.Product)
                await AsyncStorage.multiSet([
                [GLOBAL.Variables.totalPrice, (orderItem.Product.price * orderItem.Quantity).toString()],
                [GLOBAL.Variables.order, JSON.stringify(newbag)],
                [GLOBAL.Variables.numberOfItems, JSON.stringify(orderItem.Quantity)],
                [GLOBAL.Variables.restaurantId, props.route.params.data.uuidRestaurant],
                [GLOBAL.Variables.imageUrl, props.route.params.data.headerImage],
                [GLOBAL.client, props.route.params.data.client]
                ]);

                setIncrement(orderItem.Quantity);
                reset();
                
            }
            else{

                let isAnewOrderItem = true;

                for(let i=0; i<currentBag.orderItem.length; i++){
                    if(currentBag.orderItem[i].Product.id == orderItem.Product.id){

                        if(currentBag.orderItem[i].Quantity > increment){
                            let delta = currentBag.orderItem[i].Quantity - increment;
                            currentTotalPrice -= orderItem.Product.price * delta;
                            currentBag.orderItem[i].Quantity = increment;
                            await AsyncStorage.multiSet([
                                [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                                [GLOBAL.Variables.order, JSON.stringify(currentBag)],
                                [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems - delta)]
                                ]);
                        }

                        if(currentBag.orderItem[i].Quantity < increment){

                            let delta = increment - currentBag.orderItem[i].Quantity;

                            currentTotalPrice += orderItem.Product.price * delta;
                            currentBag.orderItem[i].Quantity = increment;

                            await AsyncStorage.multiSet([
                            [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                            [GLOBAL.Variables.order, JSON.stringify(currentBag)],
                            [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems + delta)]
                            ]);
                        }
                        
                        isAnewOrderItem=false;
                        reset();
                        break;
                    }
                }

                if(isAnewOrderItem == true){

                    orderItem.id = currentBag.orderItem.length + 1;
                    orderItem.Quantity = increment>0 ?increment:1;
                    currentBag.orderItem.push(orderItem);
                    currentTotalPrice += (orderItem.Product.price * orderItem.Quantity);

                    await AsyncStorage.multiSet([
                    [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                    [GLOBAL.Variables.order, JSON.stringify(currentBag)],
                    [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems + orderItem.Quantity)]
                    ]);

                    setIncrement(orderItem.Quantity);
                    reset();
                }
            }
            props.route.params.saveStateProductInLocalStorage(orderItem.Product, increment>0 ?increment:1);
        } catch (error) {
            console.log("Error Write local data");
        }
    }

    if(orderProductItem !=undefined){
        return (
            <View style={styles.container}>
                <View style={styles.demi_cercle}>
                    <View style={styles.btn_back}>
                        <TouchableOpacity 
                            onPress={() => {
                                navigation.goBack();
                                props.route.params.checkStateInLocalStorage(props.route.params.data.uuidRestaurant);
                            }}
                        >                
                            <Image
                                style={styles.icons}
                                source={require('../../assets/icons/backWigth.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.contain_img}>
                        <Image
                            style={styles.logo}
                            source={{ uri: orderProductItem.Product.imageUrl }}
                        />
                    </View>
                </View>
                {
                    increment>0 ?
                    <View style={styles.btn_sub}>
                        <TouchableOpacity 
                            onPress={() => {
                                setIncrement(increment - 1);
                                setEnableButton(true);
                            }}
                            >                
                            <Image
                                style={styles.icons}
                                source={require('../../assets/icons/signe-moins.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    :
                        <View style={[styles.btn_sub, {backgroundColor: '#dddddd'}]}>
                            <TouchableOpacity 
                                onPress={() => {}}
                                >                
                                <Image
                                    style={styles.icons}
                                    source={require('../../assets/icons/signe-moins.png')}
                                />
                            </TouchableOpacity>
                        </View>
                }
    
                <View style={styles.btn_val}>
                    <Text style={styles.txt}>{increment}</Text>
                </View>
    
                <View style={styles.btn_plus}>
                    <TouchableOpacity 
                        onPress={() => {
                            setIncrement(increment + 1);
                            setEnableButton(true);
                        }}
                    >                
                        <Image
                            style={styles.icons}
                            source={require('../../assets/icons/plus.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.contain_txt}>
                    <Text style={styles.productName}>{orderProductItem.Product.name}</Text>
                    <Text style={styles.txt_price}>Prix</Text>
                    <Text style={styles.price}>{orderProductItem.Product.price}F CFA</Text>
                    <Text style={styles.desciption}>{orderProductItem.Product.description}</Text>
                </View>
                {enableButton==true ?
                    <TouchableOpacity 
                    style={styles.btn_bag}
                    onPress={()=>{addPanier(orderProductItem)}}
                    >
                        
                        <Text style={{color: '#FFFFFF',fontSize: 20, fontWeight:'500', marginRight: 10}}>Ajouter au panier</Text>
                        <Text style={{color: '#FFFFFF',fontSize: 15, fontWeight:'400', marginLeft: 5, marginRight: 15}}>{orderProductItem.Product.price * (increment>0 ?increment:1)}F CFA</Text>
                    
                    </TouchableOpacity>
                :
                    <TouchableOpacity 
                    style={[styles.btn_bag, {backgroundColor: '#dddddd'}]}
                    onPress={()=>{}}
                    >
                        
                        <Text style={{color: '#FFFFFF',fontSize: 20, fontWeight:'500', marginRight: 10}}>Ajouter au panier</Text>
                        <Text style={{color: '#FFFFFF',fontSize: 15, fontWeight:'400', marginLeft: 5, marginRight: 15}}>{orderProductItem.Product.price * (increment>0 ?increment:1)}F CFA</Text>
                    
                    </TouchableOpacity>
                }

                <Modal
                 transparent
                 visible={showPopup}
                 animationType="fade"
                 >
                    <View style={styles.modalView}>
                        <View style={styles.modalContainer}>
                        <Image
                            style={styles.modalIcon}
                            source={require('../../assets/icons/success.png')}
                        />
                            <Text style={styles.modalText}>Produit ajouté avec succés</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    return <><Text>Loading...</Text></>
}