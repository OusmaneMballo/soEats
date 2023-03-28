import { StyleSheet,Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    demi_cercle: {
        height: hp('50%'), 
        width: wp('108%'),
        marginLeft: -17,
        alignItems:'center',
        borderWidth: 5,
        borderTopWidth: 0,
        borderColor: '#ededed',
        borderRadius : 198,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    btn_back: {
        width: 45,
        height: 45,
        backgroundColor:'#146356',
        display: "flex",
        marginLeft: -wp('80%'),
        marginTop: hp('8%'),
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 22,
    },
    productName: {
        textAlign: 'center',
        color: 'rgba(8, 32, 50, 1)',
        fontSize: 26,
        fontWeight: '600',
        marginTop: -45,
        marginLeft: 0
    },
    contain_img: {
        height: hp('30%'), 
        width: wp('65%'),
        alignItems:'center',
        backgroundColor: '#dcddde',
        borderWidth: 3,
        borderColor: '#ededed',
        borderRadius : 155,
    },
    contain_txt:{
        marginTop: 70
    },
    logo: {
        height: hp('27%'), 
        width: wp('60%'),
        marginLeft: -1,
        marginTop: 8,
        borderRadius : 165,
    },
    btn_sub: {
        width: 45,
        height: 45,
        backgroundColor:'#082032',
        display: "flex",
        marginLeft: wp('22%'),
        marginTop: -hp('5%'),
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 22,
    },
    btn_val: {
        width: 45,
        height: 45,
        backgroundColor:'#146356',
        display: "flex",
        marginLeft: wp('42%'),
        marginTop: -hp('3.8%'),
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 22,
    },
    btn_plus: {
        width: 45,
        height: 45,
        backgroundColor:'#082032',
        display: "flex",
        marginLeft: wp('62%'),
        marginTop: -hp('7%'),
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 22,
    },
    icons: {
        width :26,
        height : 26,
    },
    txt: {
        color: '#FFFFFF',
        fontSize: 30
    },
    txt_price: {
        color: 'rgba(8, 32, 50, 0.4)',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 15,
        marginTop: 30
    },
    price: {
        color: 'rgba(8, 32, 50, 1)',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 15,
        marginTop: 15,
    },
    desciption: {
        color: 'rgba(8, 32, 50, 1)',
        width: wp('90%'),
        height: 140,
        fontSize: 15,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10
    },
    btn_bag: { 
        backgroundColor: '#000000',
        height: 45,
        borderRadius: 10,
        width: 344,
        marginLeft: 15,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: { 
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: wp('62%'),
        height: wp('62%'),
        justifyContent: 'center',
        textAlign: 'center',
        paddingVertical: 30,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        //backgroundColor: 'rgba(0,0,0,0.8)',
        elevation: 10,
    },
    modalIcon: {
        width: wp('15%'),
        height: wp('15%'),
        marginTop: -40,
        alignSelf: 'center'
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
    }


})