import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flex: 0.35,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.3,
        marginHorizontal: 0
    },
    img:{
        width:wp('100%'),
        height:hp('25%'),
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        resizeMode: 'stretch',
    },
    btn_retour:{
        width :26,
        height : 26,
    },
    btn_retour_view:{
        width: 35,
        height: 35,
        backgroundColor:'#146356',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 42/2,
        marginLeft:20,
        marginTop: -20
    }
});