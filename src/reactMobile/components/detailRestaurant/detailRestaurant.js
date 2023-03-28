import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, LogBox, Alert } from 'react-native';
import Footer from '../footer/footer';
import Header from './header/header';
import { styles } from './detailRestaurantStyle';
import Rectangle from "./rectangle/rectangle";
import RectangleHours from "./hourly/rectangleHours";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { GLOBAL } from "../../environnement/constantes";

export default class DetailRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: this.props.route.params.restaurant.imageUrl,
            nameRestaurant: this.props.route.params.restaurant.name,
            addressRestaurant: this.props.route.params.restaurant.address,
            openingHours: this.props.route.params.restaurant.openingHours,
            uuidRestaurant: this.props.route.params.restaurant.id,
            showAlert: false,
            showAlert2: false,
            showModal: false,
            imagesModal: [],
            numberOfItems: 0,
            today: new Date().getUTCDay(),//Currrent Day
            hours: new Date().getUTCHours(),//Current Hours
            min: new Date().getUTCMinutes(),//Current Minutes
            commander: false

        };
    };

    verificationSiRestaurantOuvert = () => {
        for (let i = 0; i < this.state.openingHours.length; i++) {
            if (this.state.today == this.state.openingHours[i].dayOfWeek) {
                let start = parseInt(this.state.openingHours[i].slot1.startTime.toString())
                let end = parseInt(this.state.openingHours[i].slot1.endTime.toString())
                let startMinutes = parseInt(this.state.openingHours[i].slot1.startTime.split(':')[1])

                if (this.state.hours > start && this.state.hours < end) {
                    this.state.commander = true;
                    break;

                } else {
                    if (this.state.hours == start && this.state.min >= startMinutes) {
                        this.state.commander = true;
                        break;
                    }
                    this.state.commander = false
                }
            }
        }
    }

    checkBag = async () => {
        try {
            let idResto = await AsyncStorage.getItem(GLOBAL.Variables.restaurantId);
            //⚠ On verifit si y'a des produits dans le panier et que ces produits appartiennent au restaurant en cours. ⚠
            if (idResto != null && idResto != this.state.uuidRestaurant) {
                this.showAlert();
            }
            else {
                this.props.navigation.navigate('order', { resto: this.props.route.params.restaurant, promos: this.props.route.params.promos })
            }

        } catch (error) {
            console.log(error)
        }
    }

    clearBag = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('order', { resto: this.props.route.params.restaurant, promos: this.props.route.params.promos })
    }

    showAlert = () => { this.setState({ showAlert: true }); };
    showAlert2 = () => { this.setState({ showAlert2: true }); };

    hideAlert = () => { this.setState({ showAlert: false }); };

    showModal = (index, tab) => {
        let imgTab = [];
        imgTab[0] = tab[index];
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].id != tab[index].id) {
                imgTab.push(tab[i]);
            }
        }
        this.setState({ imagesModal: imgTab })
        this.setState({ showModal: true });
    };

    hideModal = () => { this.setState({ showModal: false }); };
    render() {
        const restaurant = this.props.route.params.restaurant;
        const navigation = this.props.navigation;
        const restaurantImages = restaurant.photosUrls;

        this.verificationSiRestaurantOuvert();
        LogBox.ignoreLogs([
            'Non-serializable values were found in the navigation state',
        ]);
        return (
            <>
                <AwesomeAlert
                    show={this.state.showAlert}
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
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.clearBag();
                        this.hideAlert();
                    }}
                />
                {/* ============MODAL Images */}
                <Modal transparent visible={this.state.showModal}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity onPress={() => { this.hideModal(); }}>
                                <ScrollView
                                    horizontal={true}
                                    pagingEnabled
                                >
                                    {
                                        this.state.imagesModal.map((image, index) => {

                                            return (
                                                <TouchableOpacity
                                                    onPress={() => { this.hideModal(); }}
                                                    key={index.toString()}
                                                >
                                                    <Image
                                                        style={styles.imgs_modal}
                                                        source={{ uri: image.imageUrl }}
                                                    />
                                                </TouchableOpacity>

                                            )
                                        })
                                    }
                                </ScrollView>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Header headerImage={this.state.imageUrl}/>

                <View style={styles.container}>
                    <View style={styles.View_title_and_address_restaurant}>
                        <Text style={styles.text_name_restaurant}>{restaurant.name}</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
                            <Image
                                style={styles.map_img}
                                source={require('../../assets/icons/location.png')}
                            />
                            <Text style={styles.adress_name_restaurant}>{restaurant.address}</Text>
                        </View>
                    </View>
                    <Text style={styles.text}>{restaurant.description}</Text>
                    {this.state.commander === true ?
                        <View style={styles.flex_btn}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => { this.checkBag() }}
                            >
                                <Text style={styles.btn_txt}>
                                    Commander
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.flex_btn}>
                            <AwesomeAlert
                                show={this.state.showAlert2}
                                showProgress={false}
                                title="Oups... !!!"
                                message="Le restaurant est actuellement fermé"
                                closeOnTouchOutside={true}
                                closeOnHardwareBackPress={false}
                            />
                            <TouchableOpacity
                                style={styles.btnferme}
                                onPress={() => { this.showAlert2() }}
                            >
                                <Text style={styles.btn_txt}>
                                    Fermé
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <RectangleHours openingHours={this.state.openingHours} />
                    <Text style={styles.text_restau_images}>Notre restaurant en images</Text>
                    <View style={styles.scroll_imgs}
                    >
                        <ScrollView
                            horizontal={true}
                        >
                            {
                                restaurantImages.map((image, index) => {

                                    return (
                                        <TouchableOpacity
                                            key={image.id.toString()}
                                            onPress={() => { this.showModal(index, restaurant.photosUrls) }}
                                        >
                                            <Image
                                                style={styles.imgs_restau}
                                                source={{ uri: image.imageUrl }}
                                            />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
            </>
        )
    }
}



