import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container: {
        backgroundColor:'#EBEDEE',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: hp('22%'),
        borderRadius:20
    },

    title_hourly:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop: 15,
        margin: 5,
        fontWeight:'bold',
    },
    icon_hourly:{
        width : 22,
        height :21,
    },
    text_hourly:{
        fontSize:14,
        fontWeight:'bold',
    },
    text_hourly_time:{
        fontSize:12,
        fontStyle:'normal'
    },
    text_hourly_content:{
        paddingTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:25
    },
    hourly:{
        paddingLeft:30,
        fontSize:17,
        fontWeight:'bold'
    }

});