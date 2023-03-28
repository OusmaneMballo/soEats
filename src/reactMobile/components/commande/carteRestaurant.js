import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import Header from "../detailRestaurant/header/header";
import { styles } from "./carteRestaurantStyle"
import Rectangle from "../detailRestaurant/rectangle/rectangle";
import SelectList from "../selectList/selectList";
import Footer from "../footer/footer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CarteRestaurant extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            content_bag : 0,
            
        };      
    }

    checkBag = async ()=>{
        try {
            let valueJson = await AsyncStorage.getItem('panier');
            if (valueJson!=null){
                this.setState({content_bag : 1})
            }
        } catch (error) {
            
        }
    }

    checkStateInLocalStorage=async ()=>{
        try {
          let valueJson = await AsyncStorage.getItem('state');
          if (valueJson!=null) {
            let valueState=JSON.parse(valueJson);
            this.setState({listProducts: valueState});
          }
        } catch (error) {
          
        }
    }

    componentDidMount = () => {
         this.checkBag();
    }

    render(){
        return (
            <> 
                <Header headerImage = { this.props.route.params.resto.imageUrl}/>
                <View style={styles.container}>
                    <SelectList 
                        uuidRestaurant={this.props.route.params.resto.id}
                        headerImage = {this.props.route.params.resto.imageUrl}
                        navigation = {this.props.navigation}
                        resto = {this.props.route.params.resto}
                        promotions= {this.props.route.params.promos}
                    />
                </View>
             </>
        )
        
    }
}