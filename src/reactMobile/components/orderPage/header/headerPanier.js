import React from 'react';
import {View, Text,TextInput, Keyboard, Image } from 'react-native';
import { styles } from './headerPanierStyle';

export default class HeaderPanier extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Image 
                    style={styles.img}
                    source={{uri:this.props.headerImage}}
                />
            </View>
            
        )
    }
    
}