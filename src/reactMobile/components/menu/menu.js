import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  SectionList,
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Keyboard,
  ActivityIndicator,
  ScrollView,
  Text,
  SelectList,
  Alert,
  CheckBox,
  LogBox
} from 'react-native';
import Header from "../detailRestaurant/header/header";
import { styles } from "./menuStyle";
import Rectangle from "../detailRestaurant/rectangle/rectangle";
import Footer from "../footer/footer";
import CercleMenu from "./cercle/cercle";
import {Badge} from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';
import { OrderMenuItems } from "../../model/order";
import {Menu}  from "../../model/menu";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { GLOBAL } from "../../environnement/constantes";

var listProduct = [];
var products;
var tabBoisson=[]
var tabPlat=[]
var tabDessert=[]
var tabPatisserie=[]
var tabEntree=[];
var productSelected=[];
var tabCategorieController=[]
var menu
var navigation = [];
export default class MenuComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      imageUrl :this.props.route.params.headerImage,
      showAlert: false
    
    };
  };

initializer(products){

  let SECTIONS = [];
      
  if(products.filter(p=>p.categorie==0)[0]){
    let entrees=products.filter(p=>p.categorie==0);
    let objects=[];
    let i=1;
    entrees.forEach(element=>{
      objects.push({id:i++, object:element, number:0,label:element.name, imageUrl:element.imageUrl, description:element.description});
    });
  
    SECTIONS.push(
      {
        id: GLOBAL.Categories.entree.id,
        title: GLOBAL.Categories.entree.title,
        data: objects,
      }
    );
    tabEntree = objects
  }
  if(products.filter(p=>p.categorie==2)[0]){
    let entrees=products.filter(p=>p.categorie==2);
    let objects=[];
    let i=1;
    entrees.forEach(element=>{
      objects.push({id:i++, object:element, number:0,label: element.name, imageUrl:element.imageUrl, description:element.description});
    });
    
    SECTIONS.push(
      {
        id: GLOBAL.Categories.plat.id,
        title: GLOBAL.Categories.plat.title,
        data: objects,
      }
    );
    tabPlat = objects
  }
  if(products.filter(p=>p.categorie==3)[0]){
    let entrees=products.filter(p=>p.categorie==3);
    let objects=[];
    let i=1;
    entrees.forEach(element=>{
      objects.push({id:i++, object:element, number:0,label: element.name, imageUrl:element.imageUrl, description:element.description});
    });
  
    SECTIONS.push(
      {
        id: GLOBAL.Categories.dessert.id,
        title: GLOBAL.Categories.dessert.title,
        data: objects,
      }
    );
    tabDessert = objects
  }
  if(products.filter(p=>p.categorie==4)[0]){
    let entrees=products.filter(p=>p.categorie==4);
    let objects=[];
    tabPatisserie = entrees
    let i=1;
    entrees.forEach(element=>{
      objects.push({id:i++, object:element, number:0,label: element.name, imageUrl:element.imageUrl, description:element.description});
    });
  
    SECTIONS.push(
      {
        id: GLOBAL.Categories.patisserie.id,
        title: GLOBAL.Categories.patisserie.title,
        data: objects,
        
      }
    );
    tabPatisserie = objects
  }
  if(products.filter(p=>p.categorie==1)[0]){
    let entrees=products.filter(p=>p.categorie==1);
    let objects=[];
    
    let i=1;
    entrees.forEach(element=>{
      objects.push({id:i++, object:element, number:0,label:element.name, imageUrl:element.imageUrl, description:element.description});
    });
    
    SECTIONS.push(
      {
        id: GLOBAL.Categories.boisson.id,
        title: GLOBAL.Categories.boisson.title,
        data: objects,
        
      }
    );
    tabBoisson = objects
  }
  
  return SECTIONS;
}

filtre(products){

  function groupBy(key) {
    return function group(products) {
      return products.reduce((acc, obj) => {
        const property = obj[key];
        acc[property] = acc[property] || [];
        acc[property].push(obj);
        return acc;
      }, {});
    };
  }
  
  const groupByCategories = groupBy("categorie");
  groupByCategories(products);

}

storeLocalData = async (orderMenuItem, uuidRestaurant) => {
  try {
    const localBag = await AsyncStorage.getItem(GLOBAL.Variables.order);
    const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
    const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
    let currentnumberOfItems=parseInt(numberOfItems);
    let currentTotalPrice=parseInt(localTotalPrice);
    let currentBag=JSON.parse(localBag);
    

    if(currentBag === null && uuidRestaurant!=null){
      let newbag={
        menus: [],
        orderMenuItem:[],
        orderItem: [],
        products: [],
        montant: 0
      };
      orderMenuItem.id=1;
      orderMenuItem.Quantity=1;
      newbag.orderMenuItem.push(orderMenuItem);
      currentTotalPrice=orderMenuItem.Menu.price;
      AsyncStorage.multiSet([
        [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
        [GLOBAL.Variables.order, JSON.stringify(newbag)],
        [GLOBAL.Variables.numberOfItems, JSON.stringify(1)], 
        [GLOBAL.Variables.restaurantId, uuidRestaurant], 
        [GLOBAL.Variables.imageUrl, this.state.imageUrl ]]);
    }
    else{
      orderMenuItem.id=1;
      orderMenuItem.Quantity=1;
      currentBag.orderMenuItem.push(orderMenuItem);
      currentTotalPrice+=orderMenuItem.Menu.price;
      AsyncStorage.multiSet([
        [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()], 
        [GLOBAL.Variables.order, JSON.stringify(currentBag)], 
        [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems+1)]]);
    }

    } catch (e) {
    console.log("Error Write local data");
    console.log(e)
  }
}

compareMenuContent = (menuLocalProducts, newMenuProcduct) => {
  
  for(let i=0; i<newMenuProcduct.length; i++){
    let trouv=false;
    for(let j=0; j<menuLocalProducts.length; j++){
      if(newMenuProcduct[i].id==menuLocalProducts[j].id){
        trouv=true;
        break;
      }
    }
    if(trouv==false){
      return false;
    }
  }
  return true;
}

isInLocalData = async(item, uuidRestaurant)=>{
  try {
        let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.order);
        const localTotalPrice = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
        let currentTotalPrice=parseInt(localTotalPrice);
        const numberOfItems = await AsyncStorage.getItem(GLOBAL.Variables.numberOfItems);
        let currentnumberOfItems=parseInt(numberOfItems);
        if (valueJson!=null) {
          let bag= JSON.parse(valueJson);
          let posi = 0
          let isInBag=false;
          for(let j= 0; j<bag.orderMenuItem.length; j++){
            if (bag.orderMenuItem[j].Menu.id == item.Menu.id) {
              isInBag = this.compareMenuContent(bag.orderMenuItem[j].Menu.products, item.Menu.products);
              if (isInBag) {
                bag.orderMenuItem[posi].Quantity++;
                currentTotalPrice+=item.Menu.price;
                await AsyncStorage.multiSet([
                  [GLOBAL.Variables.totalPrice, currentTotalPrice.toString()],
                  [GLOBAL.Variables.order, JSON.stringify(bag)], 
                  [GLOBAL.Variables.numberOfItems, JSON.stringify(currentnumberOfItems+1)]]);
                break;
              }
            }
            posi++;
          }
          if(isInBag==false){
            this.storeLocalData(item, uuidRestaurant);
          }
        }
        else{
          this.storeLocalData(item, uuidRestaurant);
        }
      } catch (e) {
        console.log("Error read local data");
        console.log(e)
      }
}

addPanier(obj, uuidRestaurant){
    let menuPannier = new Menu();
    menuPannier.id = menu.object.id
    menuPannier.name = menu.object.name
    menuPannier.price = menu.object.price
    menuPannier.imageUrl = menu.object.imageUrl
    menuPannier.products=[];
    for(let i=0; i<obj.length; i++){
      if(obj[i]!=undefined){
        menuPannier.products.push(obj[i])
      }
    }
    let orderMenuItem= new OrderMenuItems();
     orderMenuItem.Menu=menuPannier;
     orderMenuItem.Quantity=1;
    this.isInLocalData(orderMenuItem, uuidRestaurant);

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

  submit = () => {

    let valid = true
    for (let i = 0; i < tabCategorieController.length; i++) {
      let categorie = tabCategorieController[i]
      let trouve = false;
      for (let j = 0; j < productSelected.length; j++) {
        if (productSelected[j] != undefined && productSelected[j].categorie==categorie) {
          trouve = true;
          break
        }
      }
      if(trouve == false){
        valid = false
        break
      }
    }
    if (valid==true) {
      this.addPanier(productSelected, this.props.route.params.restaurantId)
      navigation.goBack();
      this.props.route.params.incrementationMenu(true, this.props.route.params.menu);
    }
    else{
      this.showAlert();
    }
        
  }
    
  onPressRadioButton(radioButtonsArray) {
    radioButtonsArray.forEach(p => {
        if (p.selected && p.object.categorie == 0) {
          productSelected[0] = p.object
        }
        if (p.selected && p.object.categorie == 1) {
          productSelected[1] = p.object
        }
        if (p.selected && p.object.categorie == 2) {
          productSelected[2] = p.object
        }
        if (p.selected && p.object.categorie == 3) {
          productSelected[3] = p.object
        }
        if (p.selected && p.object.categorie == 4) {
          productSelected[4] = p.object
        }      
    })
    
  }
    render(){
        navigation = this.props.navigation
        menu = this.props.route.params.menu
        products = menu.object.products
        const menu_name = menu.object.name
        const menu_price = menu.object.price
        listProduct = this.initializer(products)
        productSelected= new Array();
        tabCategorieController=new Array();
        const {showAlert} = this.state;

        LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
        ]);
        
        return (
            <> 
                <Header headerImage = { this.props.route.params.headerImage}/> 
                <View>
                    <View style = {styles.btn_retour_view}>
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
                <View style={styles.container}>
                    <CercleMenu
                        headerImage = {this.props.route.params.menu.object.imageUrl}   
                    />
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15, alignItems:'center'}}>
                            <Text style={{marginLeft:10, fontWeight:'bold', fontSize:18}}>
                                {menu_name}
                            </Text>
                            <Text style={{fontWeight:'bold', fontSize:14, marginRight:20}}>
                                {menu_price} FCFA
                            </Text>
                            
                        </View>
                    </View>
                    <SafeAreaView style={stylesList.container}>
                      <ScrollView >
                      {
                        listProduct.map((element) => {
                          tabCategorieController.push(element.id);
                          return(
                            <View key={element.id.toString()} >
                            
                              <View  style={{ flexDirection:'row', justifyContent:'center'}}>
                                  <View style={{  marginTop:20,height: 1, width: 150,marginRight:15, backgroundColor: '#146356' }} />
                                  <View  style={stylesList.header}>
                                    <Text key={element.id.toString()} style={{textAlign:'center', fontWeight:'bold',color:'#fff',}}>{element.title}</Text>
                                  </View>
                                  
                                  <View style={{ marginTop:20,height: 1, width: 150,marginLeft:15, backgroundColor: '#146356' }} />
                              </View>
                              <View style={{alignItems:'flex-start',}}>
                                {element.title == "Entrée"?
                                  <RadioGroup
                                    radioButtons={tabEntree} 
                                    onPress={this.onPressRadioButton}
                                    containerStyle = {stylesList.menu}
                                  />
                                  :null
                                }
                                {element.title == "Plat"?
                                  <RadioGroup
                                      radioButtons={tabPlat} 
                                      onPress={this.onPressRadioButton}
                                      containerStyle = {stylesList.menu}
                                  />
                                  :null
                                }
                                {element.title == "Boisson"?
                                  <RadioGroup
                                    radioButtons={tabBoisson} 
                                    onPress={this.onPressRadioButton}
                                    containerStyle = {stylesList.menu}
                                  />
                                  :null
                                }
                                
                                {element.title == "Dessert"?
                                  <RadioGroup
                                      radioButtons={tabDessert} 
                                      onPress={this.onPressRadioButton}
                                      containerStyle = {stylesList.menu}
                                  />
                                  :null
                                }
                                {element.title == "Patisserie"?
                                  <RadioGroup
                                      radioButtons={tabPatisserie} 
                                      onPress={this.onPressRadioButton}
                                      containerStyle = {stylesList.menu}
                                  />
                                  :null
                                }
                              </View>
                            </View>
                          )                          
                        })

                      }
                      </ScrollView>
                    </SafeAreaView>
                </View>
                <View style={{alignItems:'center', padding:20,}}>
                    <TouchableOpacity
                                style={stylesList.btn}
                                onPress={this.submit}
                            >
                                <Text style={stylesList.btn_txt}>
                                    Confirmer
                                </Text>
                    </TouchableOpacity>
                </View>
                
                <View >

                  <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Choix des produits"
                    message="Veuillez sélectionner un produit pour chaque catégorie"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={false}
                    cancelText="No, cancel"
                    confirmText="X"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                      this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                      this.hideAlert();
                    }}
                  />
                </View>
            </>
        )
    }
}
const stylesList = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: '#EBEDEE80',
      marginVertical: 5,
      flexDirection:'row',
    },
    header: {
      backgroundColor: "#146356",
      borderRadius:10,
      justifyContent:'center',
      width:100,
      height:30,
      marginTop:3
    },
    title: {
      fontSize: 18,
      marginTop:15
    },
    btn:{
        width: 100,
        height: 30,
        backgroundColor: '#146356',
        borderRadius: 10,
        justifyContent:'center'
    },
    btn_txt:{
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemContainer: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginTop: 8,
        borderRadius: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(8, 32, 50, 0.5)',
        marginLeft:15
    },   
    itemDescription: {
        color: 'rgba(8, 32, 50, 0.5)',
        fontSize: 9,
        marginLeft:15,
    },
    itemPrice: {
        fontSize: 15,
        color: '#082032',
        fontWeight: '500'
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        width:234
    },
    icon: {
        marginLeft: 15,
    },

    menu:{
      justifyContent:'flex-start',
      alignItems:'flex-start',
    },
  });
