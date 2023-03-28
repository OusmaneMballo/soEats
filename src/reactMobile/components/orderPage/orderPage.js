import React, { useState } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, LogBox } from 'react-native';
import HeaderPanier from "../orderPage/header/headerPanier";
import { styles } from "./orderPageStyle"
import { Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AwesomeAlert from 'react-native-awesome-alerts';
import { GLOBAL } from "../../environnement/constantes";


export default class OrderPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            bag: [],
            promotions: [],
            totalPrice: 0,
            numberOfItems: 0,
            comment: '',
            imageUrl: '',
            showAlert: false
        };

    }

    clearBag = async () => {
        await AsyncStorage.clear();
        this.setState({ bag: [], totalPrice: 0 });
        this.props.route.params.checkStateInLocalStorage(this.props.route.params.restaurant.id);
        this.props.navigation.navigate(GLOBAL.Urls.order, { resto: this.props.route.params.restaurant });
    }
    compareMenuContent(menuLocalProducts, newMenuProcduct) {

        for (let i = 0; i < newMenuProcduct.length; i++) {
            let trouv = false;
            for (let j = 0; j < menuLocalProducts.length; j++) {
                if (newMenuProcduct[i].id == menuLocalProducts[j].id) {
                    trouv = true;
                    break;
                }
            }
            if (trouv == false) {
                return false;
            }
        }
        return true;
    }
    removeInBag = async (item) => {
        try {
            let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.order);
            const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
            let currentTotalPrice = parseInt(localTotalPrice);
            const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
            let currentnumberOfItems = parseInt(numberOfItems);
            if (valueJson != null) {
                let currentbag = JSON.parse(valueJson);
                //Update nombre incrément 🧨🧨🎇(c'est bon 😅 j'ai compris! c'est a externaliser)🧨🧨🎇
                if (item.Menu != undefined) {
                    let trouv = false;
                    let randomOrderMenuItem = currentbag.orderMenuItem;
                    for (let i = 0; i < randomOrderMenuItem.length; i++) {
                        if (randomOrderMenuItem[i].Menu.id == item.Menu.id) {
                            trouv = this.compareMenuContent(randomOrderMenuItem[i].Menu.products, item.Menu.products);
                            if (trouv) {
                                currentTotalPrice -= (item.Menu.price * currentbag.orderMenuItem[i].Quantity);
                                currentnumberOfItems -= currentbag.orderMenuItem[i].Quantity;
                                currentbag.orderMenuItem.splice(i, 1);
                                if (currentbag.orderMenuItem[0] == undefined && currentbag.orderItem[0] == undefined) {
                                    this.clearBag();
                                }
                                else {

                                    this.setState({ bag: currentbag, totalPrice: currentTotalPrice });
                                    this.saveStateInLocalStorage(GLOBAL.Variables.menu, item, GLOBAL.Operations.remove);

                                    await AsyncStorage.multiSet([
                                        [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                                        [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems)],
                                        [GLOBAL.Variables.order, JSON.stringify(currentbag)]
                                    ]);
                                }
                                break;
                            }
                        }
                    }
                }
                else {
                    let randomOrderItem = currentbag.orderItem;
                    for (let i = 0; i < randomOrderItem.length; i++) {
                        if (randomOrderItem[i].Product.id == item.Product.id) {
                            currentTotalPrice -= (item.Product.price * currentbag.orderItem[i].Quantity);
                            currentnumberOfItems -= currentbag.orderItem[i].Quantity;
                            currentbag.orderItem.splice(i, 1);
                            if (currentbag.orderItem[0] == undefined && currentbag.orderMenuItem[0] == undefined) {
                                this.clearBag();
                            }
                            else {
                                this.setState({ bag: currentbag, totalPrice: currentTotalPrice });
                                this.saveStateInLocalStorage(GLOBAL.Variables.product, item, GLOBAL.Operations.remove)
                                await AsyncStorage.multiSet([[GLOBAL.Variables.totalPrice, currentTotalPrice.toString()], [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems)], [GLOBAL.Variables.order, JSON.stringify(currentbag)]]);
                            }
                            break;
                        }
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    desincrement = async (item) => {
        try {
            let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.order);
            const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
            let currentTotalPrice = parseInt(localTotalPrice);
            const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
            let currentNumberOfItems = parseInt(numberOfItems);
            if (valueJson != null) {
                let currentbag = JSON.parse(valueJson);
                //Update nombre incrément 🧨🧨🎇(c'est bon 😅 j'ai compris! c'est a externaliser)🧨🧨🎇
                if (item.Menu != undefined) {
                    let trouv = false;
                    let randomOrderMenuItem = currentbag.orderMenuItem;
                    for (let i = 0; i < randomOrderMenuItem.length; i++) {
                        if (randomOrderMenuItem[i].Menu.id == item.Menu.id) {
                            trouv = this.compareMenuContent(randomOrderMenuItem[i].Menu.products, item.Menu.products);
                            if (trouv) {
                                currentTotalPrice -= randomOrderMenuItem[i].Menu.price;
                                if (randomOrderMenuItem[i].Quantity <= 1) {
                                    currentbag.orderMenuItem.splice(i, 1);
                                    if (currentbag.orderMenuItem[0] == undefined && currentbag.orderItem[0] == undefined) {
                                        this.clearBag();
                                    }
                                    else {
                                        this.setState({ bag: currentbag, totalPrice: currentTotalPrice });
                                        this.saveStateInLocalStorage(GLOBAL.Variables.menu, item, GLOBAL.Operations.sub)
                                        await AsyncStorage.multiSet([[GLOBAL.Variables.totalPrice, currentTotalPrice.toString()], [GLOBAL.Variables.numberOfItems, JSON.stringify(currentNumberOfItems - 1)], [GLOBAL.Variables.order, JSON.stringify(currentbag)]]);
                                    }
                                    break;
                                }
                                currentbag.orderMenuItem[i].Quantity--
                                this.setState({ bag: currentbag, totalPrice: currentTotalPrice });
                                this.saveStateInLocalStorage(GLOBAL.Variables.menu, item, GLOBAL.Operations.sub)
                                await AsyncStorage.multiSet([[GLOBAL.Variables.totalPrice, currentTotalPrice.toString()], [GLOBAL.Variables.order, JSON.stringify(currentbag)], [GLOBAL.Variables.numberOfItems, JSON.stringify(currentNumberOfItems - 1)]]);
                                break;
                            }
                        }
                    }
                }
                else {
                    let randomOrderItem = currentbag.orderItem;
                    for (let i = 0; i < randomOrderItem.length; i++) {
                        if (randomOrderItem[i].Product.id == item.Product.id) {
                            currentTotalPrice -= randomOrderItem[i].Product.price;
                            if (randomOrderItem[i].Quantity <= 1) {
                                currentbag.orderItem.splice(i, 1);
                                if (currentbag.orderItem[0] == undefined && currentbag.orderMenuItem[0] == undefined) {
                                    this.clearBag();
                                }
                                else {
                                    this.setState({ bag: currentbag, totalPrice: currentTotalPrice });
                                    this.saveStateInLocalStorage(GLOBAL.Variables.product, item, GLOBAL.Operations.sub)
                                    await AsyncStorage.multiSet([[GLOBAL.Variables.totalPrice, currentTotalPrice.toString()], [GLOBAL.Variables.order, JSON.stringify(currentbag)], [GLOBAL.Variables.numberOfItems, JSON.stringify(currentNumberOfItems - 1)]]);
                                }
                                break;
                            }
                            currentbag.orderItem[i].Quantity--
                            this.setState({ bag: currentbag, totalPrice: currentTotalPrice });
                            this.saveStateInLocalStorage(GLOBAL.Variables.product, item, GLOBAL.Operations.sub)
                            await AsyncStorage.multiSet([[GLOBAL.Variables.totalPrice, currentTotalPrice.toString()], [GLOBAL.Variables.order, JSON.stringify(currentbag)], [GLOBAL.Variables.numberOfItems, JSON.stringify(currentNumberOfItems - 1)]]);
                            break;
                        }
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    saveStateInLocalStorage = async (type, item, operation) => {

        try {
            let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.state);
            if (valueJson != null) {
                let state = JSON.parse(valueJson);
                if (type == GLOBAL.Variables.menu) {
                    for (let j = 0; j < state.length; j++) {
                        let trouv = false;
                        for (let i = 0; i < state[j].data.length; i++) {
                            if (state[j].data[i].object.id == item.Menu.id) {
                                if (operation == GLOBAL.Operations.add) {
                                    state[j].data[i].number++;
                                }
                                else {
                                    if (operation == GLOBAL.Operations.sub) {
                                        state[j].data[i].number--;
                                    }
                                    else {
                                        state[j].data[i].number = 0;
                                    }
                                }
                                trouv = true;
                                break;
                            }
                        }
                        if (trouv) {
                            break
                        }
                    }

                }
                else {
                    for (let j = 0; j < state.length; j++) {
                        let trouv = false;
                        for (let i = 0; i < state[j].data.length; i++) {
                            if (state[j].data[i].object.id == item.Product.id) {
                                if (operation == GLOBAL.Operations.add) {
                                    state[j].data[i].number++;
                                }
                                else {
                                    if (operation == GLOBAL.Operations.sub) {
                                        state[j].data[i].number--;
                                    }
                                    else {
                                        state[j].data[i].number = 0;
                                    }
                                }
                                trouv = true;
                                break;
                            }
                        }
                        if (trouv) {
                            break
                        }
                    }
                }
                await AsyncStorage.setItem(GLOBAL.Variables.state, JSON.stringify(state));
            }
        } catch (error) {

        }
    }

    readLocalData = async () => {
        try {
            let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.order);
            let price = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
            let imageRestaurant = await AsyncStorage.getItem(GLOBAL.Variables.imageUrl);
            const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
            let currentnumberOfItems = parseInt(numberOfItems);

            if (valueJson != null) {
                this.setState({ isLoaded: true, bag: JSON.parse(valueJson), totalPrice: parseInt(price), numberOfItems: currentnumberOfItems, imageUrl: imageRestaurant });
            }
            else {
                this.setState({ bag: JSON.parse(valueJson), totalPrice: 0 });
            }

        } catch (e) {
            console.log(e)
            console.log("Error read local data");
        }
    }

    addPanier = async (item) => {

        let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.order);
        const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
        let currentTotalPrice = parseInt(localTotalPrice);
        const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
        let currentNumberOfItems = parseInt(numberOfItems);
        try {
            if (valueJson != null) {
                let currentbag = JSON.parse(valueJson);
                if (item.Menu != undefined) {
                    let trouv = false;
                    for (let i = 0; i < currentbag.orderMenuItem.length; i++) {
                        if (currentbag.orderMenuItem[i].Menu.id == item.Menu.id) {
                            trouv = this.compareMenuContent(currentbag.orderMenuItem[i].Menu.products, item.Menu.products);
                            if (trouv) {
                                currentTotalPrice += currentbag.orderMenuItem[i].Menu.price;
                                currentbag.orderMenuItem[i].Quantity++;
                                this.setState({ bag: currentbag, totalPrice: currentTotalPrice });
                                this.saveStateInLocalStorage(GLOBAL.Variables.menu, item, GLOBAL.Operations.add);
                                await AsyncStorage.multiSet([[GLOBAL.Variables.totalPrice, currentTotalPrice.toString()], [GLOBAL.Variables.order, JSON.stringify(currentbag)], [GLOBAL.Variables.numberOfItems, JSON.stringify(currentNumberOfItems + 1)]]);
                                break;
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < currentbag.orderItem.length; i++) {
                        if (currentbag.orderItem[i].Product.id == item.Product.id) {

                            currentTotalPrice += currentbag.orderItem[i].Product.price;
                            currentbag.orderItem[i].Quantity++;
                            this.setState({ bag: currentbag, totalPrice: currentTotalPrice });
                            this.saveStateInLocalStorage(GLOBAL.Variables.product, item, GLOBAL.Operations.add);
                            await AsyncStorage.multiSet([[GLOBAL.Variables.totalPrice, currentTotalPrice.toString()], [GLOBAL.Variables.order, JSON.stringify(currentbag)], [GLOBAL.Variables.numberOfItems, JSON.stringify(currentNumberOfItems + 1)]]);
                            break;
                        }
                    }
                }
            }

        } catch (error) {

        }
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    getPromotionsByIdResto(uuid){
        let promotionsClient = [];
        this.props.route.params.promotions.forEach(element => {
            if(element.restaurant != undefined){

                if(element.restaurant.id == uuid){
                    promotionsClient.push(element)
                }
        
            }
            else{
                if(element.superMarket.id == uuid){
                    promotionsClient.push(element)
                }
            }
        });

        this.setState({ promotions: promotionsClient });
    }

    productIsInPromo(item){
       
        if(this.props.route.params.promotions[0] != undefined && this.props.route.params.promotions[0].categorie == undefined){
            for(let i=0; i<this.state.promotions.length; i++){
                if (this.state.promotions[i].category.id == item.Product.category.id) {
                  return {reduction:this.state.promotions[i].reduction, priceNormal: (item.Product.price * 100)/(100 - this.state.promotions[i].reduction)}
                }
            }
        }

        for(let i=0; i<this.state.promotions.length; i++){
          if (this.state.promotions[i].categorie > -1 && this.state.promotions[i].categorie==item.Product.categorie) {
            return {reduction:this.state.promotions[i].reduction, priceNormal: (item.Product.price * 100)/(100 - this.state.promotions[i].reduction)}
          }
          else{
            if (item.Product.productType != undefined) {
                if (this.state.promotions[i].productType != null && this.state.promotions[i].productType.id == item.Product.productType.id) {
                  return { reduction: this.state.promotions[i].reduction, priceNormal: (item.Product.price * 100)/(100 - this.state.promotions[i].reduction)}
                }
            }
          }
        }

        return null;
    }

    async componentDidMount() {
        await this.readLocalData();
        this.getPromotionsByIdResto(this.props.route.params.restaurant.id);
    }

    render() {

        const navigation = this.props.navigation
        const { showAlert } = this.state;

        LogBox.ignoreLogs([
            'Non-serializable values were found in the navigation state',
        ]);

        if (this.state.isLoaded === true && this.state.totalPrice > 0) {
            return (
                <>
                    <HeaderPanier headerImage={this.state.imageUrl} />
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={styles.btn_retour_view}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.goBack();
                                        this.props.route.params.checkStateInLocalStorage();
                                    }}
                                >
                                    <Image
                                        style={styles.btn_retour}
                                        source={require('../../assets/icons/back.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btn_clear_view}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.showAlert();
                                    }
                                    }
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 10, color: '#ffffff' }}>
                                        Vider le panier
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <KeyboardAwareScrollView>
                            <ScrollView 
                                style={styles.scrollContain}>
                                {                                   
                                    this.state.bag.orderMenuItem.map((item, index) => {
                                        
                                        return (
                                            item.Quantity > 0 ?
                                            <View key={index.toString()} style={{ flexDirection: 'row', backgroundColor: '#EBEDEEBF', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10, borderRadius: 20, }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.addPanier(item)
                                                    }}
                                                >
                                                    <View style={{  flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 15 }}>
                                                        <Image
                                                            style={styles.itemImage}
                                                            source={{ uri: item.Menu.imageUrl }}
                                                        />
                                                        <Text style={styles.itemTitle}>{item.Menu.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{
                                                    margin: 10,
                                                    borderRadius: 20,
                                                    flexDirection: 'column',
                                                }}
                                                >
                                                    <Text style={styles.itemPrice}>{item.Menu.price} FCFA</Text>
                                                    <View style={{ width: 86, height: 26, backgroundColor: "#146356", borderRadius: 100, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 30 }}>
                                                        <TouchableOpacity
                                                            onPress={() => { this.desincrement(item) }}
                                                        >
                                                            <View style={styles.btn_panier}>

                                                                <Image
                                                                    style={{ width: 15, height: 15 }}
                                                                    source={require('../../assets/icons/signe-moins.png')}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>

                                                        <View style={{ backgroundColor: "#ffffff", width: 19, height: 19, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text>{item.Quantity}</Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() => { this.addPanier(item) }}
                                                        >
                                                            <View style={styles.btn_panier}>

                                                                <Image
                                                                    style={{ width: 15, height: 15 }}
                                                                    source={require('../../assets/icons/plus.png')}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>
                                                </View>
                                            </View>
                                            :null

                                        )
                                    })
                                }
                                {
                                    this.state.bag.orderItem.map((item, index) => {
                                        let productPromo=this.productIsInPromo(item);
                                        if (productPromo!=null) {
                                            return (
                                                item.Quantity > 0 ?
                                                <View key={index.toString()} style={{ margin:10, flexDirection: 'row', backgroundColor: '#EBEDEE', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10, borderRadius: 20, }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.addPanier(item)
                                                        }}
                                                    >
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 15 }}>
                                                        <View style={styles.box_x}></View>
                                                            <Image
                                                                style={styles.itemImage}
                                                                source={{ uri: item.Product.imageUrl }}
                                                            />
                                                            <View style={[styles.banderolle, {transform: [{ rotate: "-40deg" }]}]}>
                                                                <Text style={[styles.banderolle_txt, {transform: [{ rotate: "95deg" }]}]}>-</Text>
                                                                <Text style={[styles.banderolle_txt, {transform: [{ rotate: "95deg" }]}]}>{productPromo.reduction}</Text>
                                                                <Text style={[styles.banderolle_txt, {transform: [{ rotate: "95deg" }]}]}>%</Text>
                                                            </View>
                                                            <View style={styles.box_y}></View>
                                                            <Text style={styles.itemTitle}>{item.Product.name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={{
                                                        marginLeft:0,
                                                        margin:10,
                                                        borderRadius: 20,
                                                        flexDirection: 'column',
                                                    }}
                                                    >
                                                         <Text style={styles.priceThrough}>{productPromo.priceNormal} FCFA</Text>
                                                        <Text style={styles.itemPrice}>{item.Product.price} FCFA</Text>
                                                        <View style={{ width: 86, height: 26, backgroundColor: "#EBEDEE",borderWidth:1, borderRadius: 100, borderColor:'#146356', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 30, marginLeft: -20 }}>
                                                        <TouchableOpacity
                                                            onPress={() => { this.desincrement(item) }}
                                                        >
                                                            <View style={styles.btn_panier}>

                                                                <Image
                                                                    style={{ width: 15, height: 15 }}
                                                                    source={require('../../assets/icons/signe-moins.png')}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>

                                                        <View style={{ backgroundColor: "#ffffff", width: 19, height: 19, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text>{item.Quantity}</Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() => { this.addPanier(item) }}
                                                        >
                                                            <View style={styles.btn_panier}>

                                                                <Image
                                                                    style={{ width: 15, height: 15 }}
                                                                    source={require('../../assets/icons/plus.png')}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>
                                                    </View>
                                                </View>
                                                :null
                                            )
                                        }

                                        return (
                                            item.Quantity > 0 ?
                                            <View key={index.toString()} style={{ margin:10, flexDirection: 'row', backgroundColor: '#EBEDEE', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10, borderRadius: 20, }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.addPanier(item)
                                                    }}
                                                >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 15 }}>
                                                        <Image
                                                            style={styles.itemImage}
                                                            source={{ uri: item.Product.imageUrl }}
                                                        />
                                                        <Text style={styles.itemTitle}>{item.Product.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{
                                                    marginLeft:0,
                                                    margin:10,
                                                    borderRadius: 20,
                                                    flexDirection: 'column',
                                                }}
                                                >
                                                    <Text style={styles.itemPrice}>{item.Product.price} FCFA</Text>
                                                    <View style={{ width: 86, height: 26, backgroundColor: "#EBEDEE",borderWidth:1, borderRadius: 100, borderColor:'#146356', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 30, marginLeft: -20 }}>
                                                        <TouchableOpacity
                                                            onPress={() => { this.desincrement(item) }}
                                                        >
                                                            <View style={styles.btn_panier}>

                                                                <Image
                                                                    style={{ width: 15, height: 15 }}
                                                                    source={require('../../assets/icons/signe-moins.png')}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>

                                                        <View style={{ backgroundColor: "#ffffff", width: 19, height: 19, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text>{item.Quantity}</Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() => { this.addPanier(item) }}
                                                        >
                                                            <View style={styles.btn_panier}>

                                                                <Image
                                                                    style={{ width: 15, height: 15 }}
                                                                    source={require('../../assets/icons/plus.png')}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>
                                                </View>
                                            </View>
                                            :null
                                        )
                                    })
                                }
                            </ScrollView>
                            <View style={styles.textAreaContainer}>
                                <TextInput
                                    style={styles.textArea}
                                    underlineColorAndroid="transparent"
                                    placeholder="Commentaires"
                                    placeholderTextColor="grey"
                                    numberOfLines={50}
                                    multiline={true}
                                    onChangeText={(text) => this.setState({ comment: text })}
                                    value={this.state.comment}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                    <View style={styles.view_price}>
                        <Text style={styles.text_price}>Total : {this.state.totalPrice} FCFA</Text>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => navigation.navigate('OrderFormPage', { comment: this.state.comment, imageUrl: this.state.imageUrl })}
                        >
                            <Text style={styles.btn_txt}>
                                Continuer  {">>"}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View >
                        <AwesomeAlert
                            show={showAlert}
                            showProgress={false}
                            title="Vider le panier"
                            message="êtes vous sûr de vouloir supprimer les éléments sélectionnés du panier ?"
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showConfirmButton={true}
                            showCancelButton={true}
                            confirmText="Oui"
                            cancelText="Annuler"
                            confirmButtonColor="#DD6B55"
                            onCancelPressed={() => {
                                this.hideAlert();
                            }}
                            onConfirmPressed={() => {
                                this.clearBag()
                            }}
                        />
                    </View>
                    <View style={{ flex: 0.1, alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('Restaurants')
                            }
                        >
                            <View style={{ backgroundColor: '#000000', height: 45, borderRadius: 10, width: 344, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <View style={{
                                    width: 27,
                                    height: 27,
                                    backgroundColor: '#146356',
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 27 / 2,
                                    marginRight: 10
                                }}>
                                    <Image
                                        style={{
                                            width: 14,
                                            height: 14,
                                        }}
                                        source={require('../../assets/icons/back.png')}
                                    />
                                </View>
                                <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 14 }}>
                                    Liste des restaurants
                                </Text>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </>
            )
        }
        return (
            <>
                <HeaderPanier />
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.btn_retour_view}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Image
                                    style={styles.btn_retour}
                                    source={require('../../assets/icons/back.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text>Votre panier est vide!</Text>
                </View>
                <View style={styles.view_price}>
                </View>
            </>
        );
    }
}