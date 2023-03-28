import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        height: hp('13%'),
        backgroundColor:'#FFFFFF',
        borderRadius : 20,
        marginTop: -160,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        
    },

    img_Logo:{
        width: 78,
        height: 78,
        borderRadius : 78/2,
        resizeMode:'cover'
    },

    img_View:{
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 80/2,
        width: 80,
        height: 80,
        borderWidth: 2,
        textAlign: "center",
        borderColor: '#146356',
        margin: 30,  
    },

    text_name:{
        color: 'rgba(8, 32, 50, 0.5)',
        fontSize: 14,
        fontWeight: 'bold'
    },

    text_address:{
        marginTop: 20,
        color: 'rgba(8, 32, 50, 0.5)',
        fontSize: 14,
        width:210
    }

});