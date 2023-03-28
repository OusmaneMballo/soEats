import React from 'react';
import {View, Text,TextInput, Keyboard, Image } from 'react-native';
import { styles } from './rectangleStyle';

export default class Rectangle extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.img_View}>
                    <Image
                        style = {styles.img_Logo}
                        source={{uri:this.props.headerImage}}
                    />
                </View>

                <View>
                    <Text style = {styles.text_name}>{this.props.name}</Text>
                    <Text style = {styles.text_address}>{this.props.address}</Text>
                </View>
            </View>
        )
    }
    
}