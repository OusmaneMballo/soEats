import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container: {
      // flex: 0.2,
      // marginTop: -10,
      backgroundColor: '#3346FF',
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // height:'8%'
      height: hp('7%'), // 21% of height device screen
      width: wp('100%'),
      alignItems:'center'   // 45% of width device screen
    },
    img: {
      // margin: 50,
      // marginTop: 22,
      marginLeft:50,
      marginRight:50,
      // width: 20,
      // height: 20,
      height: hp(2.5), // 21% of height device screen
      width: wp(4.5),
    },
});