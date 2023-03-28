import React from 'react';
import {View, Text,TextInput, Keyboard, Image } from 'react-native';
import { styles } from './cercleStyle';

export default class CercleMenu extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.img_View}>
                    <Image
                        style = {styles.img_Logo}
                        source={{uri:this.props.headerImage}}
                    />
                </View>
            </View>
        )
    }
    
}