import React from 'react';
import { TouchableWithoutFeedback, View, TextInput, Text,Keyboard, Image,ScrollView ,KeyboardAvoidingView} from 'react-native';
import { styles } from './headerStyle';

export default function Header(){
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                <View style={styles.container}>
                    <View tyle={{flexDirection:'column', }}>
                        <View style={{flexDirection:'row', }}>
                            <View style={styles.logo_content}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../assets/icon-96x96.png')}
                                />
                            </View>
                            <View style={styles.content_loupe}>
                                <Image
                                    style={styles.loupe}
                                    source={require('../../assets/icons/loupe.png')}
                                />
                            </View>
                            <TextInput
                                style={styles.searchBar}
                                placeholder='Rechercher'
                            />
                        </View>
                        <View style={{justifyContent:'center', alignItems:'flex-start'}}>
                            <Text style={{marginTop:10, paddingBottom:10, fontWeight:'400', fontSize:16, fontStyle:'normal'}}>
                                Veuillez choisir votre restaurant
                            </Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}