import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop:3,
        padding: 15,
        justifyContent:'space-around',
        flexDirection:'column',
    },
    View_title_and_address_restaurant:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        flexWrap:'wrap'
    },
    text_name_restaurant:{
        fontSize:18, 
        fontWeight:'900'
    },
    map_img:{
        width :26,
        height : 26,
    },
    adress_name_restaurant:{
        marginLeft:5,
        fontSize:14, 
        fontWeight:'500'
    },
    text:{
        fontSize: 14,
        color:"#082032",
        fontStyle:'italic',
        textAlign: 'auto'
    },
    flex_btn:{
        flexDirection: 'row',
        justifyContent: 'center',
    },

    btn:{
        width: 150,
        height: 40,
        backgroundColor: '#146356',
        borderRadius: 100
    },
    btnferme:{
        width: 150,
        height: 40,
        backgroundColor: '#b2b2c0',
        borderRadius: 100
    },

    btn_txt:{
        color: '#FFFFFF',
        textAlign: 'center',
        paddingTop: 9,
        fontWeight: 'bold',
        fontSize: 16
    },

    text_restau_images:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:16,
        fontStyle:'normal',
    },
    scroll_imgs:{
        flexDirection:'row',
    },
    imgs_restau:{
        height: hp('15%'), 
        width: wp('30%'),
        borderRadius:20,
        marginRight:20
    },
    btn_retour:{
        width :26,
        height : 26,
    },
    btn_retour_view:{
        width: 35,
        height: 35,
        backgroundColor:'#FFFFFF',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 42/2,
        marginLeft:20,
        marginTop: -20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '75%',
        marginTop: 140,
        paddingVertical: 30,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        elevation: 20,
    },
    button: {
        borderRadius: 20,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    imgs_modal:{
        height: hp('35%'), 
        width: wp('70%'),
        borderRadius:20,
        marginRight:10
    },
    
});