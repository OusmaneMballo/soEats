import React from 'react';
import { View, Text, TextInput, Keyboard, Image, TouchableOpacity } from 'react-native';
import { styles } from './headerStyle';
import { useNavigation } from '@react-navigation/native';

export default function Header(props) {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{ uri: props.headerImage }}
            />
            <View style={{ position: 'absolute', top: 70 }}>
                    <View style={styles.btn_retour_view}>
                        <TouchableOpacity
                            onPress={() =>{
                                navigation.goBack()
                            }}
                        >
                            <Image
                                style={styles.btn_retour}
                                source={require('../../../assets/icons/back.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )


}