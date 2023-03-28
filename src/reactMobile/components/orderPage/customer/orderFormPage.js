import React, {useEffect, useState} from "react";
import { View,StyleSheet, ScrollView,Image,Text ,TouchableOpacity, Alert,ListItem,SafeAreaView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { zoneLivraison } from "../zone_livraison";
import HeaderPanier from "../header/headerPanier";
import { styles } from "./orderFormPageStyle"
import { appConfig } from "../../../environnement/config";
import RadioGroup from 'react-native-radio-buttons-group';
import { TextInput } from 'react-native-paper';
import { GLOBAL } from "../../../environnement/constantes";



const radioButtonsData = [{
    id: '1', 
    label: 'A emporter',
}, {
    id: '2',
    label: 'Se faire livrer',
}]



export default class OrderFormPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            bag: [],
            totalPrice: 0,
            comment: '',
            restaurantId: '',
            client: '',
            
        };
        
    }

    getBagAndAmount = async ()=>{
        try {
            let valueJson = await AsyncStorage.getItem(GLOBAL.Variables.order);
            let price = await AsyncStorage.getItem(GLOBAL.Variables.totalPrice);
            let idRestaurant = await AsyncStorage.getItem(GLOBAL.Variables.restaurantId);
            let client = await AsyncStorage.getItem(GLOBAL.client)
            if (valueJson!=null && price!=null && idRestaurant!=null && client!=null) {
            this.setState({isLoaded: true, bag: JSON.parse(valueJson), totalPrice: parseInt(price),  restaurantId: idRestaurant, client: client});
            }
            else{
                this.setState({isLoaded: true, bag: JSON.parse(valueJson), totalPrice: 0});
            }
        } catch (e) {
          console.log("Error read local data");
          console.log(e)
        }
    }

    componentDidMount() {
        this.getBagAndAmount();
       }

    render(){
        const navigation = this.props.navigation;
        const comment = this.props.route.params.comment
        if (this.state.isLoaded==true) {
            return (
                <> 
                    <HeaderPanier headerImage = {this.props.route.params.imageUrl}/>
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style = {styles.btn_retour_view}>
                                    <TouchableOpacity 
                                            onPress={() => navigation.goBack()}
                                            >                
                                                <Image
                                                    style={styles.btn_retour}
                                                    source={require('../../../assets/icons/back.png')}
                                                />
                                    </TouchableOpacity>
                            </View>
                        </View>
                        
                    </View>
                    
                    <View style={styles.container}>
                        <ScrollView >
                            <Contact
                                navigation={this.props.navigation}
                                comment={comment}
                                localBag={this.state.bag}
                                totalPrice={this.state.totalPrice}
                                guid={this.state.restaurantId}
                                client={this.state.client}
                             
                            />
                        </ScrollView>
                    </View>
                </>
            )
        }
        else{
            return (
                <> 
                    <HeaderPanier/>
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style = {styles.btn_retour_view}>
                                    <TouchableOpacity 
                                            onPress={() => navigation.goBack()}
                                            >                
                                                <Image
                                                    style={styles.btn_retour}
                                                    source={require('../../../assets/icons/back.png')}
                                                />
                                    </TouchableOpacity>
                            </View>
                           
                        </View>
                        
                    </View>
                </>
            )
        }
    }
}

function  Contact ({navigation, comment, localBag, totalPrice, guid, client}) {
    const [formFirstName, setFormFirstName] = useState('');
    const [formName, setFormName] = useState('');
    const [formAddress, setFormAddress] = useState('');
    const [formPhoneNumber, setFormPhoneNumber] = useState('');
    const [checked, setChecked] = React.useState('');
    const [deliveryZone, setDeliveryZone] = React.useState('');
    const [deliveryZonesFromAPI, setDeliveryZonesFromAPI] = useState([]);
    const [bag, setBag] = React.useState(localBag);
    const [amount, setAmount] = React.useState(totalPrice);
    const [amountZone, setAmountZone] = React.useState(0);
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);

    useEffect(() => {
        fetch(appConfig.API_URL + "/deliveryZone")
            .then((response) => response.json())
            .then((json) => {
                setDeliveryZonesFromAPI(json);
            })
            .catch((error) => console.error(error))
    }, [])

    const zones = []
    {   
        deliveryZonesFromAPI.sort(function compare(a,b){
            if (a.zoneId < b.zoneId) {
                return -1
            }
            if (a.zoneId > b.zoneId) {
                deliveryZonesFromAPI.map((obj)=>{
                    obj.zones.map((e) => {
                        zones.push(e)
                    })
                })
            }
        })
       
    }


    const getZone = (zoneSelected) => {
        deliveryZonesFromAPI.forEach((element) => {
            element.zones.forEach((zone) => {
                if (zoneSelected == zone) {
                    setDeliveryZone("Zone "+element.zoneId)
                    setAmountZone(element.deliveryPrice)
                }
            })
        })
    }

    const sendOrder=(order)=>{
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            };
       
            if(GLOBAL.Client.restaurant == client){

                fetch(appConfig.API_URL+`/restaurants/${guid}/orders`, requestOptions)
                .then(response =>response.text())
                .then((data)=>{console.log(data)}, (error)=>{console.log(error)});
            }

            if(GLOBAL.Client.supermarket == client){

                fetch(appConfig.API_URL+`/supermarket/${guid}/order`, requestOptions)
                .then(response =>response.text())
                .then((data)=>{console.log(data)}, (error)=>{console.log(error)});
            }
        } catch (error) {
            console.error(error)
        }
    }

    const serializer = ()=>{
        if (bag!=null && amount!=null) {
            let orderProductItems=[];
            let orderMenuItems=[];
            bag.orderItem.forEach((element) => {
                let p={
                    id: element.Product.id,
                    cardId:  element.Product.cardId,
                    name:  element.Product.name,
                    price:  element.Product.price,
                    originalPrice: element.Product.originalPrice,
                    description:  element.Product.description,
                    categorie:  element.Product.categorie,
                    imageUrl:  element.Product.imageUrl,
                    productType: element.Product.productType
                }
                orderProductItems.push({
                    Quantity: element.Quantity,
                    Product: p
                });
            });

            bag.orderMenuItem.forEach((element)=>{
                let productsMenu=[];
                element.Menu.products.forEach((item)=>{

                    productsMenu.push(
                        {
                            id: item.id,
                            cardId: item.cardId,
                            name: item.name,
                            price: item.price,
                            description: item.description,
                            categorie: item.categorie,
                            imageUrl: item.imageUrl
                        }
                    )
                });

                orderMenuItems.push(
                    {
                        Quantity: element.Quantity,
                        Menu: {
                            id: element.Menu.id,
                            cardId: element.Menu.cardId,
                            name: element.Menu.name,
                            imageUrl: element.Menu.imageUrl,
                            price: element.Menu.price,
                            products: productsMenu
                        }
                    }
                );
            })

            if (orderMenuItems[0]!=null || orderProductItems[0]!=null) {

                let order={};

                if(GLOBAL.Client.restaurant == client){

                    order={
                        CustomerAdress:formAddress,
                        CustomerFirstname:formFirstName,
                        CustomerLastname:formName,
                        CustomerEmail:"soEats@soeats.com",
                        CustomerPhoneNumber:'221'+formPhoneNumber,
                        OrderDeliveryMethod:1,
                        RestaurantId:guid,
                        Remark:comment,
                        orderDate: new Date(),
                        DeliveryZone:deliveryZone,
                        DeliveryPrice:amountZone,
                        Amount:amount,
                        orderProductItems: orderProductItems,
                        orderMenuItems: orderMenuItems
                    }

                }

                if(GLOBAL.Client.supermarket == client){

                    order={
                        CustomerAdress:formAddress,
                        CustomerFirstname:formFirstName,
                        CustomerLastname:formName,
                        CustomerEmail:"soEats@soeats.com",
                        CustomerPhoneNumber:'221'+formPhoneNumber,
                        OrderDeliveryMethod:1,
                        superMarketId:guid,
                        Remark:comment,
                        orderDate: new Date(),
                        DeliveryZone:deliveryZone,
                        DeliveryPrice:amountZone,
                        Amount:amount,
                        orderProductItems: orderProductItems
                    }

                }

                return order;
            }
            
        }

        return null;
    }

    function onPressRadioButton(radioButtonsArray) {
        radioButtonsArray.forEach(p => {
            if (p.selected && p.id == 2) {
                setChecked('0')
            }
            else{
                setChecked('1')
            }
        })
    }

    const clearBag = async () =>{
        await AsyncStorage.clear();
    }

    /**
     * Expression régulière utilisée pour valider un numéro de téléphone.
     * **/
    function testNumeroTelephone(phoneNumber){
        let expReg=new RegExp("^(75|70|76|77|78)[0-9]{7}");
        if(expReg.test(phoneNumber)){
            return true;
        }
        return false;
    }

    const submit = () => {
       
        if(!formFirstName||!formName||!formAddress||!formPhoneNumber)
        {
            Alert.alert('Veuillez saisir tous les champs.');

        }else{
            let Order=serializer();
            console.log(Order);
            if(Order!=null){
                if (Order.OrderDeliveryMethod == 0 && Order.DeliveryZone ==="") {
                    Alert.alert("Veuillez selectionner une zone de livraison.")
                }else{ 

                    if (testNumeroTelephone(formPhoneNumber)) {
                            sendOrder(Order);
                            Alert.alert('Votre commande a été bien envoyée.')
                            clearBag();
                            navigation.navigate('Restaurants')
                            
                    } else{
                        alert("Numéro téléphone invalide.")
                    }
                }
            }
        }
    }

    return(
        <View style={stylesform.form}>
            <TextInput
                label="Prénom"
                color='#146356'
                style={stylesform.txtinput}
                onChangeText={firstName => setFormFirstName(firstName)}
                value={formFirstName}
                autoCapitalize='words'
                selectTextOnFocus={true}
            />
            <TextInput
                label="Nom"
                style={stylesform.txtinput}
                onChangeText={name => setFormName(name)}
                value={formName}
                autoCapitalize='words'
                selectTextOnFocus={true}
            />
            <TextInput
                label="Adresse"
                style={stylesform.txtinput}
                onChangeText={address => setFormAddress(address)}
                value={formAddress}
                autoCapitalize='words'
                selectTextOnFocus={true}
                right={<TextInput.Icon name="home" />}
            />
            <TextInput
                label="Téléphone"
                style={stylesform.txtinput}
                onChangeText={phoneNumber => setFormPhoneNumber(phoneNumber)}
                value={formPhoneNumber}
                selectTextOnFocus={true}
                keyboardType={'phone-pad'}
                right={<TextInput.Icon name="phone" />}
            />
            {
                (checked=='0') ?
                  <View style={{marginTop:29}}>
                    <SelectDropdown buttonStyle={{width:300, borderRadius:10}}
                        buttonTextStyle={{color:'#146356'}}
                        defaultButtonText={'Zone de livraison'}
                        dropdownStyle={{borderRadius:30, height:500, backgroundColor:'#EBEDEE'}}
                        rowStyle={{width:290, borderRadius:20, margin:5}}
                        rowTextStyle={{color:'#146356', textAlign:'center'}}
                        data={zones}
                        keyExtractor={(item, index) => index.toString()}
                        onSelect={(selectedItem) => {
                            getZone(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return (
                                <Text >
                                    {item}
                                </Text>
                            )
                        }}
                    />
                </View>    : null
            }
            
            <View style={{marginTop:30}}>
                
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontWeight:'800', fontSize:16, color:'#146356',}}>
                        Frais de livraison : {amountZone}
                      
                    </Text>
                </View> 
                <Text style={{fontWeight:'800', fontSize:16, color:'#08203280'}}>
                    Le montant total à payer : {amount + amountZone} <Text style={{fontWeight:'bold'}}>FCFA</Text>
                </Text>
               
            </View>
            <TouchableOpacity
                            style={stylesform.btn}
                            onPress={submit}
                        >
                            <Text style={stylesform.btn_txt}>
                                Valider
                            </Text>
            </TouchableOpacity>
        </View>
    );

}

const stylesform = StyleSheet.create({
    form: {
        alignItems: 'center',
        flexDirection:'column',
        padding:18
    },
    txtinput:{
        backgroundColor: '#EBEDEE',
        marginTop: 15,
        width: 344,
        height: 50,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingLeft:15
    },
    btn:{
        width: 100,
        height: 40,
        backgroundColor: '#146356',
        borderRadius: 20,
        marginTop:80

    },
    btn_txt:{
        color: '#FFFFFF',
        textAlign: 'center',
        paddingTop: 9,
        fontWeight: 'bold',
        fontSize:16
    },
    txt_mode_livraison:{
        width:170,
        fontWeight: '600',
        fontStyle:'normal',
        fontSize:17,
        color:'#08203280'
    },
    txt_choix_mode_livraison:{
        width:100,
        fontWeight: '600',
        fontStyle:'normal',
        fontSize:14,
        color:'#08203280',
        marginTop:8
    },

});
