import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, FlatList, Image, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity, TextInput, Text, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { styles } from './restaurantsStyle';
import { appConfig } from "../../environnement/config";
import { GLOBAL } from "../../environnement/constantes";
import AwesomeAlert from 'react-native-awesome-alerts';
import IconBadge from 'react-native-icon-badge';


function getCategorieDisplayName(categorieId) {

    if (GLOBAL.Categories.entree.id == categorieId) return GLOBAL.Categories.entree.title;
    if (GLOBAL.Categories.boisson.id == categorieId) return GLOBAL.Categories.boisson.title;
    if (GLOBAL.Categories.plat.id == categorieId) return GLOBAL.Categories.plat.title;
    if (GLOBAL.Categories.dessert.id == categorieId) return GLOBAL.Categories.dessert.title;
    if (GLOBAL.Categories.patisserie.id == categorieId) return GLOBAL.Categories.patisserie.title;
    return '';
}

export default function Restaurants() {

    const [dataLoading, finishLoading] = useState(true);
    const [dataContainer, setDataContainer] = useState([]);
    const [restaurantsData, setData] = useState([]);
    const [superMarket, setSuperMarket] = useState([]);
    const [restaurantsCategoryData, setCategoryData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [promotionsSuperMarket, setPromotionsSuperMarket] = useState([]);
    const [promotionsRestaurant, setPromotionsRestaurant] = useState([]);
    const [filteredData, setfilterdData] = useState([]);
    const [search, setSearch] = useState('');
    const [categoryRestaurantValue, setCategoryRestaurantValue] = useState('');
    const [badgeCount, setBadgeCount] = useState(0);
    const navigation = useNavigation();
    const [restau, setRestau] = useState(null);
    const isFocused = useIsFocused();
    var today = new Date().getUTCDay();//Currrent Day
    var hours = new Date().getUTCHours();//Current Hours
    var min = new Date().getUTCMinutes();//Current Minutes

    useEffect(() => {
        fetch(appConfig.API_URL + "/restaurants/clients")
            .then((response) => response.json())
            .then((json) => {
                dataSeter(json)
            })
            .catch((error) => console.error(error))
            .finally(() => finishLoading(false))
    }, [])

    useEffect(() => {
        fetch(appConfig.API_URL + "/promotions")
            .then((response) => response.json())
            .then((json) => {
                setPromotionsRestaurant(json);
            })
            .catch((error) => console.error(error))
            .finally(() => finishLoading(false))
    }, []);

    useEffect(() => {
        fetch(appConfig.API_URL + "/superMarket/promotions")
            .then((response) => response.json())
            .then((json) => {
                setPromotionsSuperMarket(json);
            })
            .catch((error) => console.error(error))
            .finally(() => finishLoading(false))
    }, []);


    useEffect(() => {
        fetch(appConfig.API_URL + "/restaurants/categories")
            .then((response) => response.json())
            .then((json) => {
                setCategoryData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => finishLoading(false))
    }, [])

    function dataSeter(clients){

        let data = [];
        setData(clients.restaurantDto)
        for(let i = 0; i < clients.restaurantDto.length; i++){
            data.push(clients.restaurantDto[i]);
        }
        for(let i = 0; i < clients.superMarketDto.length; i++){
            data.push(clients.superMarketDto[i]);
        }

        setDataContainer(data);
        setfilterdData(data);
    }

    function dataPromotionsSeter(){

        let allPromotions = [];
        
        for(let i = 0; i < promotionsRestaurant.length; i++){
            allPromotions.push(promotionsRestaurant[i]);
        }

        for(let i = 0; i < promotionsSuperMarket.length; i++){
            allPromotions.push(promotionsSuperMarket[i]);
        }
        
        setPromotions(allPromotions);
    }

    useEffect(() => {
        dataPromotionsSeter();
    }, []);


    const restaurantItem = ({ item }) => {
        return (
            <View style={styles.content_affichage_restaurants}>
                <View style={styles.affichage_restaurants}>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('DetailRestaurant', { restaurant: item, promos: promotions, getBadgeCount: getBadgeCount })
                        }
                    >
                        <View>
                            <Image
                                style={styles.img}
                                source={{ uri: item.imageUrl }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.view_restaurant_title} >
                    <Text style={styles.restaurant_title}>
                        {item.name}
                    </Text>
                </View>
            </View>
        )
    };

    // ⚠️ Important! do not remove ⚠️
    let categoryData = [];

    const onPress = (item) => setCategoryRestaurantValue(

        dataContainer.forEach(d => {
            if (d.restaurantCategories != null) {
                d.restaurantCategories.forEach(rc => {
                    if (rc.id == item.id) {
                        categoryData.push(d)
                        setfilterdData(categoryData);
                    }
                })
            }
            else{
                if (item.value == "supermarché"){
                    categoryData.push(d)
                    setfilterdData(categoryData)
                }
            }

        })
    );
    const restaurantOuvert = (Resto) => {
        for (let i = 0; i < Resto.openingHours.length; i++) {
            if (today == Resto.openingHours[i].dayOfWeek) {
                let start = parseInt(Resto.openingHours[i].slot1.startTime.toString())
                let end = parseInt(Resto.openingHours[i].slot1.endTime.toString())
                let startMinutes = parseInt(Resto.openingHours[i].slot1.startTime.split(':')[1])

                if (hours > start && hours < end) {
                    return true
                } else {
                    if (hours == start && min >= startMinutes) {
                        return true
                    }
                    return false
                }
            }
        }
    }

    const getBadgeCount = async ()=>{

        const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
        
        if (numberOfItems != null) {
            setBadgeCount(parseInt(numberOfItems));
        }
        else{
            setBadgeCount(0);
        }

    }
    const checkBag = async (Resto) => {
        try {

            setShowAlert2(false)
            setRestau(Resto)
            let idResto = await AsyncStorage.getItem(GLOBAL.Variables.restaurantId);
            //⚠ On verifit si y'a des produits dans le panier et que ces produits appartiennent au restaurant en cours. ⚠
            if (idResto != null && idResto != Resto.id) {
                if (restaurantOuvert(Resto) == false) {
                    setShowAlert2(true);
                }
                else{
                    affichageModal();
                }
            }
            else {
                if (restaurantOuvert(Resto)) {
                    navigation.navigate('order', { resto: Resto, promos: promotions })
                } else
                    setShowAlert2(true)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const clearBag = async () => {
        await AsyncStorage.clear();
        navigation.navigate('order', { resto: restau, promos: promotions })
    }

    affichageModal = () => { setShowAlert(true); };
    cacheModal = () => { setShowAlert(false); };

    function getCategories() {
        let categories = []
        for (let i = 0; i < restaurantsCategoryData.length; i++) {
            for (let j = 0; j < restaurantsData.length; j++) {
                if(restaurantsData[j].restaurantCategories != null) {
                    for (let index = 0; index < restaurantsData[j].restaurantCategories.length; index++) {
                        if (restaurantsCategoryData[i].id == restaurantsData[j].restaurantCategories[index].id || restaurantsCategoryData[i].value == "supermarché") {
                            categories.push(restaurantsCategoryData[i])
                            j = restaurantsData.length;
                            break;
                        }
    
                    }
                }

            }
        }
        return categories;
    }

    const restaurantCategoryItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => onPress(item)}
            >
                <View style={styles.logo_content_categories}>
                    <Image
                        style={styles.imgs_cat}
                        source={{ uri: item.imageUrl }}
                    />
                </View>
                <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: '300', marginTop: 5 }}>
                    {item.displayName}
                </Text>
            </TouchableOpacity>
        )
    };

    const searchFilter = (text) => {
        if (text) {
            const newData = restaurantsData.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterdData(newData);
            setSearch(text);
        } else {
            setfilterdData(restaurantsData);
            setSearch(text);
        }
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    if(isFocused){
        getBadgeCount()
    }
    return (
        <>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Attention !"
                message="Vous avez des produits dans votre panier. Si vous changez de restaurant, votre panier sera vidé !"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Annuler"
                confirmText="Continuer"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    cacheModal();
                    setShowAlert2(false)
                }}
                onConfirmPressed={() => {
                    clearBag();
                    cacheModal();
                }}
            />
            <AwesomeAlert
                show={showAlert2}
                showProgress={false}
                title="Oups... !!!"
                message="Le restaurant est actuellement fermé"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
            />

            <View style={{ flex: 1, backgroundColor: '#ffffff', }}>
                <View style={[styles.header_view, styles.header_view_retouched]}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                            <View tyle={{ flexDirection: 'column', }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={styles.logo_content}>
                                        <Image
                                            style={styles.logo}
                                            source={require('../../assets/LogoS.png')} />
                                    </View>
                                    <View style={styles.content_loupe}>
                                        <Image
                                            style={styles.loupe}
                                            source={require('../../assets/icons/loupe.png')} />
                                    </View>
                                    <TextInput
                                        style={styles.searchBar}
                                        placeholder='Rechercher'
                                        value={search}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => searchFilter(text)}
                                    />
                                    <View style={styles.pannier_content}>
                                        <Image
                                            style={styles.pannier}
                                            source={require('../../assets/shopping-bag.png')}
                                        />
                                        <IconBadge
                                            BadgeElement={
                                            <Text style={{color:'rgba(0, 0, 0, 1)'}}>{badgeCount}</Text>
                                            }
                                            IconBadgeStyle={
                                            {width:25,
                                            height:25,
                                            backgroundColor: '#EBEDEE',
                                            marginTop: -35,
                                            }
                                            }
                                            Hidden={badgeCount==0}
                                        />
                                    </View>
                                </View>

                                <View style={styles.row_categories}>
                                    <TouchableOpacity
                                        onPress={() => setfilterdData(dataContainer)}
                                    >
                                        <View style={{ alignItems: 'center', marginLeft: 5 }}>
                                            <View style={styles.logo_content_categorie}>
                                                <Image
                                                    style={styles.img_all_cat}
                                                    source={require('../../assets/carres.png')} />
                                            </View>
                                            <Text style={{ fontSize: 10, marginTop: 5 }}>Toutes</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <FlatList
                                        style={{ marginLeft: 10 }}
                                        horizontal={true}
                                        data={getCategories()}
                                        renderItem={restaurantCategoryItem}
                                        keyExtractor={(item) => item.id.toString()}
                                        showsHorizontalScrollIndicator={false} />
                                </View>
                                <View style={styles.promo_content}>
                                    <ScrollView
                                        horizontal={true}
                                    >
                                        {promotions.map((promo, index) => {

                                            let categorieDisplayName = '';
                                            let client=null;
                                            if(promo.categorie ==undefined){
                                                categorieDisplayName = promo.category.displayName;
                                                client = promo.superMarket
                                            }
                                            else{
                                                categorieDisplayName = getCategorieDisplayName(promo.categorie);
                                                client = promo.restaurant;
                                            }
                                            return (
                                                <TouchableOpacity
                                                    key={promo.id.toString()}
                                                    onPress={() => { checkBag(client) }}
                                                >
                                                    <View style={styles.promo_box}>
                                                        {promo.categorie == -1 ?
                                                            <>
                                                                <Image
                                                                    style={styles.imgPromo}
                                                                    source={{ uri: promo.imageUrl }} />
                                                                <View style={styles.row}>
                                                                    <Text style={styles.textPromo}>-{promo.reduction}% sur nos {promo.productType.displayName} </Text>
                                                                    {
                                                                        
                                                                      promo.restaurant == undefined ?
                                                                        <Image
                                                                            style={styles.logoResto}
                                                                            source={{ uri: promo.superMarket.imageUrl }} 
                                                                        />
                                                                      :
                                                                        <Image
                                                                            style={styles.logoResto}
                                                                            source={{ uri: promo.restaurant.imageUrl }} 
                                                                        />
                                                                    }
                                                                </View>
                                                            </>
                                                            :
                                                            <>
                                                                <Image
                                                                    style={styles.imgPromo}
                                                                    source={{ uri: promo.imageUrl }} />
                                                                <View style={styles.row}>
                                                                    <Text style={styles.textPromo}>-{promo.reduction}% sur nos {categorieDisplayName} </Text>
                                                                    {
                                                                        
                                                                        promo.restaurant == undefined ?
                                                                          <Image
                                                                              style={styles.logoResto}
                                                                              source={{ uri: promo.superMarket.imageUrl }} 
                                                                          />
                                                                        :
                                                                          <Image
                                                                              style={styles.logoResto}
                                                                              source={{ uri: promo.restaurant.imageUrl }} 
                                                                          />
                                                                    }
                                                                </View>
                                                            </>}
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </ScrollView>
                                </View>

                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.container}>
                    {dataLoading ? <ActivityIndicator /> : (
                        <FlatList
                            numColumns={2}
                            data={filteredData}
                            renderItem={restaurantItem}
                            keyExtractor={(item) => item.id.toString()}
                            keyboardDismissMode={'none'} />
                    )}
                </View>

            </View></>
    )
}