import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, TouchableOpacity, Animated, TouchableWithoutFeedback, Dimensions, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { styles } from "./selectListStyle";
import SectionList from 'react-native-tabs-section-list';
import { appConfig } from "../../environnement/config";
import { GLOBAL } from "../../environnement/constantes";
import { Menu } from "../../model/menu";
import { OrderProductItems, OrderMenuItems } from "../../model/order";
import { SafeAreaView } from "react-native-safe-area-context";

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
export default class SelectList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      listProducts: [],
      promotions: [],
      headerImage: this.props.headerImage,
      restaurant: this.props.resto,
      refreshing: false,
      showButton: false,
      numberOfItems: 0,
      modalX: new Animated.Value(-deviceWidth),
      filteredData: [],
      search: ''
    };
  }

  openModal = () => {
    Animated.timing(this.state.modalX, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true
    }).start()
  }

  closeModal = () => {
    Animated.timing(this.state.modalX, {
      duration: 300,
      toValue: -deviceWidth,
      useNativeDriver: true
    }).start()
  }

  productItem = ({ item }) => {
    const navigation = this.props.navigation;
    let productPromo = this.productIsInPromo(item);
    if (productPromo != null) {
      return (
        item.number != 0 ?
          <View key={item.id} style={{ flexDirection: 'row', backgroundColor: '#EBEDEE', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10, borderRadius: 20, }}>
            <TouchableOpacity
              onPress={() => {
                if (item.object.categorie == undefined && item.object.category == undefined) {
                  navigation.navigate('Menu', { menu: item, headerImage: this.props.headerImage, restaurantId: this.props.uuidRestaurant, incrementationMenu: this.incrementationMenu })
                }
                else {
                  this.addPanier(item, productPromo.newPrice);
                }
              }}
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemRow}>
                  <View style={styles.box_x}></View>
                  <Image
                    style={styles.itemImage}
                    source={{ uri: item.object.imageUrl }}
                  />
                  <View style={[styles.banderolle, { transform: [{ rotate: "-40deg" }] }]}>
                    <Text style={[styles.banderolle_txt, { transform: [{ rotate: "95deg" }] }]}>-</Text>
                    <Text style={[styles.banderolle_txt, { transform: [{ rotate: "95deg" }] }]}>{productPromo.reduction}</Text>
                    <Text style={[styles.banderolle_txt, { transform: [{ rotate: "95deg" }] }]}>%</Text>
                  </View>
                  <View style={styles.box_y}></View>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.itemTitle}>{item.object.name}</Text>
                    <Text style={styles.itemDescription}>{item.object.description}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{
              paddingVertical: 20,
              paddingHorizontal: 15,
              backgroundColor: '#EBEDEE',
              marginTop: 10,
              borderRadius: 20,
              flexDirection: 'column',
            }}
            >
              <Text style={styles.priceThrough}>{item.object.price} FCFA</Text>
              <Text style={styles.itemPrice}>{productPromo.newPrice} FCFA</Text>
              <View style={{ width: 86, height: 26, borderWidth: 1, borderColor: '#146356', borderRadius: 100, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 30 }}>
                <TouchableOpacity
                  onPress={() => { this.desincrement(item, GLOBAL.Operations.sub, productPromo.newPrice) }}
                >
                  <View style={styles.btn_panier}>

                    <Image
                      style={{ width: 15, height: 15 }}
                      source={require('../../assets/icons/signe-moins.png')}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: "#ffffff", width: 19, height: 19, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>{item.number}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => { this.incrementation(item, GLOBAL.Operations.add, productPromo.newPrice) }}
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
          :
          <TouchableOpacity onPress={() => {
            if (item.object.categorie == undefined && item.object.category == undefined) {
              navigation.navigate('Menu', { menu: item, headerImage: this.props.headerImage, restaurantId: this.props.uuidRestaurant, incrementationMenu: this.incrementationMenu })
            }
            else {
              this.addPanier(item, productPromo.newPrice);
            }

          }
          }>
            <View style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <View style={styles.box_x}></View>
                <Image
                  style={styles.itemImage}
                  source={{ uri: item.object.imageUrl }}
                />
                <View style={[styles.banderolle, { transform: [{ rotate: "-40deg" }] }]}>
                  <Text style={[styles.banderolle_txt, { transform: [{ rotate: "95deg" }] }]}>-</Text>
                  <Text style={[styles.banderolle_txt, { transform: [{ rotate: "95deg" }] }]}>{productPromo.reduction}</Text>
                  <Text style={[styles.banderolle_txt, { transform: [{ rotate: "95deg" }] }]}>%</Text>
                </View>
                <View style={styles.box_y}></View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.itemTitle}>{item.object.name}</Text>
                  <Text style={styles.itemDescription}>{item.object.description}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                <Text style={styles.priceThrough}>{item.object.price} FCFA</Text>
                <Text style={styles.itemPrice}>{productPromo.newPrice} FCFA</Text>
                <View style={styles.btn_retour_view}>
                  <Image
                    style={{ width: 16, height: 16 }}
                    source={require('../../assets/icons/panier_pleine.png')}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
      )
    }
    else {
      return (
        item.number != 0 ?
          <View key={item.id} style={{ flexDirection: 'row', backgroundColor: '#EBEDEE', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10, borderRadius: 20, }}>
            <TouchableOpacity
              onPress={() => {
                if (item.object.categorie == undefined && item.object.category == undefined) {
                  navigation.navigate('Menu', { menu: item, headerImage: this.props.headerImage, restaurantId: this.props.uuidRestaurant, incrementationMenu: this.incrementationMenu })
                }
                else {
                  this.addPanier(item, 0)

                }
              }}
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemRow}>
                  <Image
                    style={styles.itemImage}
                    source={{ uri: item.object.imageUrl }}
                  />
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.itemTitle}>{item.object.name}</Text>
                    <Text style={styles.itemDescription}>{item.object.description}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{
              paddingVertical: 20,
              paddingHorizontal: 15,
              backgroundColor: '#EBEDEE',
              marginTop: 10,
              borderRadius: 20,
              flexDirection: 'column',
            }}
            >
              <Text style={styles.itemPrice}>{item.object.price} FCFA</Text>
              <View style={{ width: 86, height: 26, borderWidth: 1, borderColor: '#146356', borderRadius: 100, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 30 }}>
                <TouchableOpacity
                  onPress={() => { this.desincrement(item, GLOBAL.Operations.sub, 0) }}
                >
                  <View style={styles.btn_panier}>

                    <Image
                      style={{ width: 15, height: 15 }}
                      source={require('../../assets/icons/signe-moins.png')}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: "#ffffff", width: 19, height: 19, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>{item.number}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {this.incrementation(item, GLOBAL.Operations.add, 0) }}
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
          :
          <TouchableOpacity onPress={() => {
            if (item.object.categorie == undefined && item.object.category == undefined) {
              navigation.navigate('Menu', { menu: item, headerImage: this.props.headerImage, restaurantId: this.props.uuidRestaurant, incrementationMenu: this.incrementationMenu })
            }
            else {
              this.addPanier(item, 0);
            }
        
          }
          }>
            <View style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <Image
                  style={styles.itemImage}
                  source={{ uri: item.object.imageUrl }}
                />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.itemTitle}>{item.object.name}</Text>
                  <Text style={styles.itemDescription}>{item.object.description}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                <Text style={styles.itemPrice}>{item.object.price} FCFA</Text>
                <View style={styles.btn_retour_view}>
                  <Image
                    style={{ width: 16, height: 16 }}
                    source={require('../../assets/icons/panier_pleine.png')}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
      )
    }


  };

  productIsInPromo(product) {

    if(this.state.promotions[0] != undefined && this.state.promotions[0].categorie == undefined){
      
      for (let i = 0; i < this.state.promotions.length; i++) {
        if (this.state.promotions[i].category.id == product.object.category.id) {
          return { reduction: this.state.promotions[i].reduction, newPrice: (product.object.price * (100 - this.state.promotions[i].reduction)) / 100 }
        }
      }

    }

    for (let i = 0; i < this.state.promotions.length; i++) {
      if (this.state.promotions[i].categorie > -1 && this.state.promotions[i].categorie == product.object.categorie) {
        return { reduction: this.state.promotions[i].reduction, newPrice: (product.object.price * (100 - this.state.promotions[i].reduction)) / 100 }
      }
      else {
        if (product.object.productType != undefined) {
          if (this.state.promotions[i].productType != null && this.state.promotions[i].productType.id == product.object.productType.id) {
            return { reduction: this.state.promotions[i].reduction, newPrice: (product.object.price * (100 - this.state.promotions[i].reduction)) / 100 }
          }
        }

      }
    }
    return null;
  }

  clearBag = async () => {
    await AsyncStorage.clear();
    this.checkStateInLocalStorage(this.state.restaurant.id);
  }

  initialiseSuperMarketSections(sections){

    let SECTIONS = [];
    let i = 1;

    sections.forEach(item => {

      let objects = [];

      item.products.forEach(p => {
        objects.push({ id: i++, object: p, number: 0 })
      });

      SECTIONS.push(
        {
          id: item.id,
          title: item.displayName,
          data: objects
        }
      );
    });

    
    return SECTIONS;
  }

  initializer(card) {

    let SECTIONS = [];

    if (card.menus[0]) {
      let objects = [];
      let i = 1;
      card.menus.forEach(element => {
        objects.push({ id: i++, object: element, number: 0 });
      });

      SECTIONS.push(
        {
          id: GLOBAL.Categories.menu.id,
          title: GLOBAL.Categories.menu.title,
          data: objects
        }
      );
    }

    if (card.products.filter(p => p.categorie == 0)[0]) {
      let entrees = card.products.filter(p => p.categorie == 0);
      let objects = [];
      let i = 1;
      entrees.forEach(element => {
        objects.push({ id: i++, object: element, number: 0 });
      });

      SECTIONS.push(
        {
          id: GLOBAL.Categories.entree.id,
          title: GLOBAL.Categories.entree.title,
          data: objects
        }
      );
    }

    if (card.products.filter(p => p.categorie == 2)[0]) {
      let entrees = card.products.filter(p => p.categorie == 2);
      let objects = [];
      let i = 1;
      entrees.forEach(element => {
        objects.push({ id: i++, object: element, number: 0 });

      });

      SECTIONS.push(
        {
          id: GLOBAL.Categories.plat.id,
          title: GLOBAL.Categories.plat.title,
          data: objects
        }
      );
    }

    if (card.products.filter(p => p.categorie == 3)[0]) {
      let entrees = card.products.filter(p => p.categorie == 3);
      let objects = [];
      let i = 1;
      entrees.forEach(element => {
        objects.push({ id: i++, object: element, number: 0 });

      });

      SECTIONS.push(
        {
          id: GLOBAL.Categories.dessert.id,
          title: GLOBAL.Categories.dessert.title,
          data: objects
        }
      );
    }

    if (card.products.filter(p => p.categorie == 4)[0]) {
      let entrees = card.products.filter(p => p.categorie == 4);
      let objects = [];
      let i = 1;
      entrees.forEach(element => {
        objects.push({ id: i++, object: element, number: 0 });

      });

      SECTIONS.push(
        {
          id: GLOBAL.Categories.patisserie.id,
          title: GLOBAL.Categories.patisserie.title,
          data: objects
        }
      );
    }

    if (card.products.filter(p => p.categorie == 1)[0]) {
      let entrees = card.products.filter(p => p.categorie == 1);
      let objects = [];
      let i = 1;
      entrees.forEach(element => {
        objects.push({ id: i++, object: element, number: 0 });

      });

      SECTIONS.push(
        {
          id: GLOBAL.Categories.boisson.id,
          title: GLOBAL.Categories.boisson.title,
          data: objects
        }
      );
    }

    return SECTIONS;
  }

  getPromotionsByIdResto(uuid) {
    
    let promotionsClient = [];
    this.props.promotions.forEach(element => {
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

  getSections(superMarketId) {
    fetch(appConfig.API_URL + `/supermarket/sections/${superMarketId}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({ isLoaded: true, listProducts: this.initialiseSuperMarketSections(data), filteredData: this.initialiseSuperMarketSections(data) });
    });
  }

  getCard(uuid) {
    fetch(appConfig.API_URL + `/restaurants/${uuid}/cards`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ isLoaded: true, listProducts: this.initializer(data), filteredData: this.initializer(data) });
      })
      .catch((error) => console.error(error))
  }

  checkStateInLocalStorage = async (uuid) => {
    try {

      let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.state);
      const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);

      if (numberOfItems != null) {
        let valueState = JSON.parse(valueJson);
        let currentnumberOfItems = parseInt(numberOfItems);
        this.setState({ listProducts: valueState, showButton: true, numberOfItems: currentnumberOfItems, filteredData: valueState });
      }
      else {
        this.setState({ showButton: false });

        //On verifit si on a un restaurant ou un supermarché
        
        if(this.props.resto.restaurantCategories != undefined){
          this.getCard(uuid);
        }
        else{
          this.getSections(uuid)
        }

      }
    } catch (error) {
      console.log(error)

    }
  }

  storeLocalData = async (orderItem) => {

    try {
      const navigation = this.props.navigation;
      navigation.navigate('ProductDetail', { data: { OrderProductItem: orderItem, uuidRestaurant: this.props.uuidRestaurant, headerImage: this.props.headerImage }, checkStateInLocalStorage: this.checkStateInLocalStorage })
      const localBag = await AsyncStorage.getItem(GLOBAL.Variables.order);
      const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
      const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
      let currentTotalPrice = parseInt(localTotalPrice);
      let currentnumberOfItems = parseInt(numberOfItems);
      let currentBag = JSON.parse(localBag);

      if (currentBag === null) {

        let newbag = {
          menus: [],
          orderMenuItem: [],
          orderItem: [],
          products: [],
          montant: 0
        };

        orderItem.id = 1
        orderItem.Quantity = 1;
        newbag.orderItem.push(orderItem);
        newbag.products.push(orderItem.Product)
        let numberOfItems = 1;
        this.setState({ showButton: true, numberOfItems: 1 });

        await AsyncStorage.multiSet([
          [GLOBAL.Variables.totalPrice, orderItem.Product.price.toString()],
          [GLOBAL.Variables.order, JSON.stringify(newbag)],
          [GLOBAL.Variables.numberOfItems, JSON.stringify(numberOfItems)],
          [GLOBAL.Variables.restaurantId, this.props.uuidRestaurant],
          [GLOBAL.Variables.imageUrl, this.props.headerImage]
        ]);

      }
      else {

        orderItem.id = currentBag.orderItem.length + 1;
        orderItem.Quantity = 1;

        currentBag.orderItem.push(orderItem);
        currentTotalPrice += orderItem.Product.price;
        this.setState({ showButton: true, numberOfItems: currentnumberOfItems + 1 })

        await AsyncStorage.multiSet([
          [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
          [GLOBAL.Variables.order, JSON.stringify(currentBag)],
          [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems + 1)]
        ]);
      }
    } catch (e) {
      console.log("Error Write local data");
      console.log(e)
    }
  }

  isInLocalData = async (item, operation) => {
    try {

      let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.order);
      const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
      const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
      let currentnumberOfItems = parseInt(numberOfItems);
      let currentTotalPrice = parseInt(localTotalPrice);
      if (valueJson != null) {
        let isInBag = false;
        let posi = 0
        let i = 0;
        let bag = JSON.parse(valueJson);
        if (item.Menu != undefined) {
          for (let j = 0; j < bag.orderMenuItem.length; j++) {
            if (bag.orderMenuItem[j].Menu.id == item.Menu.id) {
              bag.orderMenuItem[posi].Quantity++;
              currentTotalPrice += item.Menu.price;
              await AsyncStorage.multiSet([
                [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                [GLOBAL.Variables.order, JSON.stringify(bag)],
                [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems + 1)]]);
              this.getItemInState(item, operation)
              isInBag = true;
              break;
            }
            posi++
          }
        } else {
          bag.orderItem.forEach((element) => {

            if (element.Product.id == item.Product.id) {

              isInBag = true;
              posi = i;
            }
            i++;
          });

          const navigation = this.props.navigation;
          if (isInBag == false) {
            navigation.navigate('ProductDetail', { data: { OrderProductItem: item, uuidRestaurant: this.props.uuidRestaurant, headerImage: this.props.headerImage, client: this.props.resto.restaurantCategories != undefined ? 'Restaurant' : 'SuperMarket' }, checkStateInLocalStorage: this.checkStateInLocalStorage, saveStateProductInLocalStorage: this.saveStateProductInLocalStorage })
          }
          else {

            if(operation == GLOBAL.Operations.add){
              bag.orderItem[posi].Quantity += 1;
              currentTotalPrice += item.Product.price;
              await AsyncStorage.multiSet([
                [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                [GLOBAL.Variables.order, JSON.stringify(bag)],
                [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems + 1)]
              ]);
              this.getItemInState(item, operation)
            }
            else{
              navigation.navigate('ProductDetail', { data: { OrderProductItem: bag.orderItem[posi], uuidRestaurant: this.props.uuidRestaurant, headerImage: this.props.headerImage, client: this.props.resto.restaurantCategories != undefined ? 'Restaurant' : 'SuperMarket' }, checkStateInLocalStorage: this.checkStateInLocalStorage, saveStateProductInLocalStorage: this.saveStateProductInLocalStorage })
            }
          }
        }

      }
      else {
        const navigation = this.props.navigation;
        navigation.navigate('ProductDetail', { data: { OrderProductItem: item, uuidRestaurant: this.props.uuidRestaurant, headerImage: this.props.headerImage, client: this.props.resto.restaurantCategories != undefined ? 'Restaurant' : 'SuperMarket' }, checkStateInLocalStorage: this.checkStateInLocalStorage, saveStateProductInLocalStorage: this.saveStateProductInLocalStorage })
      }
    } catch (e) {
      console.log("Error read local data");
      console.log(e)
    }
  }

  saveStateProductInLocalStorage = async (obj, nombre) => {

    for (let i = 0; i < this.state.listProducts.length; i++) {
      for (let j = 0; j < this.state.listProducts[i].data.length; j++) {
        if (this.state.listProducts[i].data[j].object.id == obj.id) {
          this.state.listProducts[i].data[j].number = nombre;
          this.setState({ listProducts: this.state.listProducts });
          await AsyncStorage.setItem(GLOBAL.Variables.state, JSON.stringify(this.state.listProducts));
          break;
        }
      }
    }
  }

  saveStateInLocalStorage = async () => {
    try {
      await AsyncStorage.setItem(GLOBAL.Variables.state, JSON.stringify(this.state.listProducts));
    } catch (error) {
    }
  }

  addPanier(obj, promoPrice) {
    
    let orderItem = new OrderProductItems();
    if(obj.object.category != undefined){
      let object = {
        id: obj.object.id,
        sectionId: obj.object.sectionId,
        superMarketId:obj.object.superMarketId,
        name: obj.object.name,
        description: obj.object.description,
        category: obj.object.category,
        imageUrl: obj.object.imageUrl,
        price: obj.object.price,
        originalPrice: obj.object.price,
      };
      orderItem.Product = object;
      object.price = promoPrice != 0 ? promoPrice : obj.object.price;
    }
    else{
      let object = {
            id: obj.object.id,
            cardId: obj.object.cardId,
            name: obj.object.name,
            description: obj.object.description,
            categorie: obj.object.categorie,
            imageUrl: obj.object.imageUrl,
            price: obj.object.price,
            originalPrice: obj.object.price,
            productType: obj.object.productType
          };
      orderItem.Product = object;
      object.price = promoPrice != 0 ? promoPrice : obj.object.price;
    }

    orderItem.Quantity = 0;
    
    this.isInLocalData(orderItem)
  }


  getItemInState(item, operation) {

    let trouv = false;
    let currentnumberOfItems = this.state.numberOfItems;
    if (item.Menu != undefined) {

      for (let i = 0; i < this.state.listProducts.length; i++) {
        for (let j = 0; j < this.state.listProducts[i].data.length; j++) {
          if (this.state.listProducts[i].data[j].object.id == item.Menu.id) {

            if (operation == GLOBAL.Operations.add) {
              this.state.listProducts[i].data[j].number++;
              this.setState({ listProducts: this.state.listProducts, showButton: true, numberOfItems: currentnumberOfItems + 1 });
              this.saveStateInLocalStorage();
              trouv = true;
              break;
            }
            if (operation == GLOBAL.Operations.sub) {
              if (this.state.listProducts[i].data[j].number > 0) {
                this.state.listProducts[i].data[j].number -= 1;
                this.setState({ listProducts: this.state.listProducts, numberOfItems: currentnumberOfItems - 1 });
                this.saveStateInLocalStorage();
                if (this.state.numberOfItems <= 0) {
                  this.clearBag()
                }
              }
              trouv = true;
              break;
            }
          }
        }
        if (trouv) {
          break;
        }
      }
    } else {
      for (let i = 0; i < this.state.listProducts.length; i++) {
        for (let j = 0; j < this.state.listProducts[i].data.length; j++) {
          if (this.state.listProducts[i].data[j].object.id == item.Product.id) {
            if (operation == GLOBAL.Operations.add || operation == undefined) {
              this.state.listProducts[i].data[j].number++;
              this.setState({ listProducts: this.state.listProducts, showButton: true, numberOfItems: currentnumberOfItems + 1 });
              this.saveStateInLocalStorage();
              trouv = true;
              break;
            }
            if (operation == GLOBAL.Operations.sub) {
              if (this.state.listProducts[i].data[j].number > 0) {
                this.state.listProducts[i].data[j].number -= 1;
                this.setState({ listProducts: this.state.listProducts, numberOfItems: currentnumberOfItems - 1 });
                this.saveStateInLocalStorage();
                if (this.state.numberOfItems <= 0) {
                  this.clearBag()
                }
                trouv = true;
                break;
              }
            }
          }
        }
        if (trouv) {
          break;
        }
      }
    }

  }

  incrementationMenu = (etat, item, operation) => {
    if (etat == true) {
      let trouv = false;
      let currentnumberOfItems = this.state.numberOfItems;
      for (let i = 0; i < this.state.listProducts.length; i++) {
        for (let j = 0; j < this.state.listProducts[i].data.length; j++) {
          if (this.state.listProducts[i].data[j].object.id == item.object.id) {
            this.state.listProducts[i].data[j].number++;
            this.setState({ listProducts: this.state.listProducts, showButton: true, numberOfItems: currentnumberOfItems + 1 });
            this.saveStateInLocalStorage();
            trouv = true;
            break;
          }
        }
        if (trouv) {
          break;
        }
      }
    }
  }

  desincrementation = async (item, operation) => {
    try {

      let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.order);
      const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
      const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
      let currentnumberOfItems = parseInt(numberOfItems);
      let currentTotalPrice = parseInt(localTotalPrice);
      if (valueJson != null) {
        let isInBag = false;
        let posi = 0
        let i = 0;
        let bag = JSON.parse(valueJson);
        if (item.Menu != undefined) {
          for (let j = 0; j < bag.orderMenuItem.length; j++) {
            if (bag.orderMenuItem[j].Menu.id == item.Menu.id) {
              bag.orderMenuItem[posi].Quantity--;
              currentTotalPrice -= item.Menu.price;
              await AsyncStorage.multiSet([
                [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                [GLOBAL.Variables.order, JSON.stringify(bag)],
                [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems - 1)]]);
              this.getItemInState(item, operation)
              isInBag = true;
              break;
            }
            posi++
          }
        } else {
          bag.orderItem.forEach((element) => {

            if (element.Product.id == item.Product.id) {
              posi = i;
            }
            i++;
          });
          bag.orderItem[posi].Quantity -= 1;
          currentTotalPrice -= item.Product.price;
          await AsyncStorage.multiSet([
            [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
            [GLOBAL.Variables.order, JSON.stringify(bag)],
            [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems - 1)]
          ]);
          this.getItemInState(item, operation)
        }

      }
    } catch (e) {
      console.log("Error read local data");
      console.log(e)
    }
  }

  removeInBag = async (item) => {
    try {
      let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.order);
      const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
      let currentTotalPrice = parseInt(localTotalPrice);
      const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
      let currentnumberOfItems = parseInt(numberOfItems);
      if (valueJson != null) {
        let bag = JSON.parse(valueJson);

        //Update nombre incrément 🧨🧨🎇(c'est bon 😅 j'ai compris! c'est a externaliser)🧨🧨🎇
        let trouv = false;
        for (let i = 0; i < this.state.listProducts.length; i++) {
          for (let j = 0; j < this.state.listProducts[i].data.length; j++) {
            if (this.state.listProducts[i].data[j].object.id == item.object.id) {
              this.state.listProducts[i].data[j].number = 0;
              this.setState({ listProducts: this.state.listProducts });
              this.saveStateInLocalStorage();
              trouv = true;
              break;
            }
          }
          if (trouv) {
            break;
          }
        }

        if (item.object.products != undefined) {
          for (let i = 0; i < bag.orderMenuItem.length; i++) {
            if (bag.orderMenuItem[i].Menu.id == item.object.id) {
              currentTotalPrice -= (item.object.price * bag.orderMenuItem[i].Quantity);
              currentnumberOfItems -= bag.orderMenuItem[i].Quantity;
              this.setState({ numberOfItems: currentnumberOfItems });
              bag.orderMenuItem.splice(i, 1);
              if (bag.orderMenuItem[0] == null && bag.orderItem[0] == null) {
                currentTotalPrice = 0;
                this.clearBag();
              }
              await AsyncStorage.multiSet([
                [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                [GLOBAL.Variables.order, JSON.stringify(bag)],
                [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems)]
              ]);
              break;
            }
          }
        }
        else {
          for (let i = 0; i < bag.orderItem.length; i++) {
            if (bag.orderItem[i].Product.id == item.object.id) {
              currentTotalPrice -= (item.object.price * bag.orderItem[i].Quantity);
              currentnumberOfItems -= bag.orderItem[i].Quantity;
              this.setState({ numberOfItems: currentnumberOfItems });
              bag.orderItem.splice(i, 1);
              if (bag.orderItem[0] == null && bag.orderMenuItem[0] == null) {
                currentTotalPrice = 0;
                this.clearBag();
              }
              await AsyncStorage.multiSet([
                [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                [GLOBAL.Variables.order, JSON.stringify(bag)],
                [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems)]
              ]);
              break;
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 2000);
  };

  bootstrap(idResto) {
    this.checkStateInLocalStorage(idResto);
    this.getPromotionsByIdResto(idResto);
  }

  incrementation = async (item, operation, promoPrice) => {
    // Test si c'est un menu
    if (item.object.categorie == undefined && item.object.category == undefined) {
      let orderMenuItem = new OrderMenuItems();
      orderMenuItem.Menu = item.object;
      this.isInLocalData(orderMenuItem, operation);
    }
    else {

      let orderItem = new OrderProductItems();

      //Test si c'est un produit d'un supermarché
      if(item.object.category != undefined){

        let object = {
          id: item.object.id,
          sectionId: item.object.sectionId,
          name: item.object.name,
          description: item.object.description,
          category: item.object.category,
          imageUrl: item.object.imageUrl,
          price: 0
        };

        orderItem.Product = object;
        object.price = promoPrice != 0 ? promoPrice : item.object.price;

      }
      else{

        let object = {
          id: item.object.id,
          cardId: item.object.cardId,
          name: item.object.name,
          description: item.object.description,
          categorie: item.object.categorie,
          imageUrl: item.object.imageUrl,
          price: 0
        };

        orderItem.Product = object;
        object.price = promoPrice != 0 ? promoPrice : item.object.price;
      }
      this.isInLocalData(orderItem, operation);
    }

  }
  desincrement = async (item, operation, promoPrice) => {
    //Test si c'est un menu
    if (item.object.categorie == undefined && item.object.category == undefined) {
      let orderMenuItem = new OrderMenuItems();
      orderMenuItem.Menu = item.object;
      this.desincrementation(orderMenuItem, operation);
    }
    else {
      let orderItem = new OrderProductItems();
      //Test si c'est un produit d'un supermarché
      if(item.object.category != undefined){
        let object = {
          id: item.object.id,
          sectionId: item.object.sectionId,
          name: item.object.name,
          description: item.object.description,
          category: item.object.category,
          imageUrl: item.object.imageUrl,
          price: 0
        };
  
        orderItem.Product = object;
        object.price = promoPrice != 0 ? promoPrice : item.object.price;
      }
      else{
        let object = {
          id: item.object.id,
          cardId: item.object.cardId,
          name: item.object.name,
          description: item.object.description,
          categorie: item.object.categorie,
          imageUrl: item.object.imageUrl,
          price: 0
        };
  
        orderItem.Product = object;
        object.price = promoPrice != 0 ? promoPrice : item.object.price;
      }
      
      this.desincrementation(orderItem, operation);
    }

  }
  componentDidMount() {
    this.bootstrap(this.props.uuidRestaurant);
  }
  searchFilter = (text) => {
    if (text) {
      let elementShorted = [];
      this.state.listProducts.forEach((productOrder) => {
        const newData = productOrder.data.filter((item) => {
          const itemData = item.object.name ? item.object.name.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();

          return itemData.indexOf(textData) > -1;
        });
        elementShorted.push({ id: productOrder.id, data: newData, title: productOrder.title });
      })
      this.setState({ filteredData: elementShorted });
      this.setState({ search: text });
    } else {
      this.setState({ filteredData: this.state.listProducts });
      this.setState({ search: text });
    }
  }
  render() {
    const navigation = this.props.navigation
    if (this.state.showButton == true && this.state.numberOfItems > 0) {
      return (
        <View style={styles.container}>
          <Animated.View style={[styles.modal, { transform: [{ translateX: this.state.modalX }] }, Keyboard.dismiss]} accessible={false}>
            <TouchableOpacity style={styles.buttonClose} onPress={this.closeModal}>
              <Image
                style={{ width: 30, height: 30, }}
                source={require('../../assets/icons/left.png')} />
            </TouchableOpacity>
            <TextInput
              style={styles.searchBar}
              placeholder='Rechercher'
              value={this.state.search}
              scrollEnabled={false}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.searchFilter(text)}
            />
          </Animated.View>
          <TouchableOpacity style={styles.searchBtn}
            onPress={this.openModal}
          >
            <Image
              style={{ width: 20, height: 20, }}
              source={require('../../assets/icons/loupe.png')} />
          </TouchableOpacity>
          <SectionList
            sections={this.state.filteredData}
            onScrollToIndexFailed={() => { }}
            keyExtractor={item => item.id}
            stickySectionHeadersEnabled={false}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            scrollToLocationOffset={50}
            tabBarStyle={styles.tabBar}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderTab={({ title, isActive }) => (
              <TouchableOpacity
                style={[
                  styles.tabContainer,
                  { borderBottomWidth: isActive ? 1 : 1 },
                  { backgroundColor: isActive ? '#146356' : '#FFFFFF' }
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? '#FFFFFF' : '#146356' }
                  ]}
                >
                  {title}
                </Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <View>
                <View style={styles.sectionHeaderContainer} />
                <Text style={styles.sectionHeaderText}>{section.title}</Text>
              </View>
            )}

            renderItem={this.productItem}
          />
          <View style={{ flex: 0.1, alignItems: 'center' }}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('OrderPage', { restaurant: this.state.restaurant, promotions: this.state.promotions, checkStateInLocalStorage: this.checkStateInLocalStorage })
              }
            >
              <View style={{ backgroundColor: '#000000', height: 45, borderRadius: 10, width: 344, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 14 }}>
                  Voir le panier ({this.state.numberOfItems})
                </Text>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.modal, { transform: [{ translateX: this.state.modalX }] }, Keyboard.dismiss]} accessible={false}>
          <TouchableOpacity style={styles.buttonClose} onPress={this.closeModal}>
            <Image
              style={{ width: 30, height: 30, }}
              source={require('../../assets/icons/left.png')} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder='Rechercher'
            value={this.state.search}
            scrollEnabled={false}
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.searchFilter(text)}
          />
        </Animated.View>
        <TouchableOpacity style={styles.searchBtn}
          onPress={this.openModal}
        >
          <Image
            style={{ width: 20, height: 20, }}
            source={require('../../assets/icons/loupe.png')} />
        </TouchableOpacity>
        <SectionList
          sections={this.state.filteredData}
          keyExtractor={item => item.id}
          stickySectionHeadersEnabled={false}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          scrollToLocationOffset={50}
          tabBarStyle={styles.tabBar}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderTab={({ title, isActive }) => (
            <TouchableOpacity
              style={[
                styles.tabContainer,
                { borderBottomWidth: isActive ? 1 : 1 },
                { backgroundColor: isActive ? '#146356' : '#FFF' }
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? '#FFFFFF' : '#146356' }
                ]}
              >
                {title}
              </Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section }) => (
            <View>
              <View style={styles.sectionHeaderContainer} />
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
          )}
          renderItem={this.productItem} />
        <View style={{ flex: 0.05, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../assets/Vector.png')} />
            <Text style={{ color: '#000000', fontWeight: '700', fontSize: 14, marginLeft: 5 }}>
              Cliquez pour sélectionner un produit
            </Text>
          </View>
        </View>
      </View>
    );

  }

}