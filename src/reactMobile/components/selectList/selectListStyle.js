import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import { RotationGestureHandler } from 'react-native-gesture-handler';
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
      },
      modal:{
        width:deviceWidth,
        height:deviceHeight*0.07,
        position:'absolute',
        zIndex:1,
        backgroundColor:'#fff',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
      },
      searchBar: {
        backgroundColor: '#EBEDEE',
        width: deviceWidth - 130,
        height: deviceHeight / 23,
        borderRadius: 20,
        paddingLeft: 13,
        marginLeft: -1,
      },
      buttonClose:{
        backgroundColor:'#fff',
        alignItems:'center',
        borderRadius: 20,
        width: 35,
        height: deviceHeight / 23,
        justifyContent:'center',
      },
      buttonText:{
        color:'black',
        fontSize:20
      },
      tabBar: {
        marginLeft: 55,
        marginTop: -48
      },
      searchBtn: {
        width: 43,
        height: 40,
        backgroundColor: '#EBEDEE',
        borderWidth: 1,
        borderColor: '#EBEDEE',
        borderRadius: 15,
        justifyContent: 'center', 
        alignItems: 'center',
        
      },
      tabContainer: {
        borderColor: '#146356',
        borderWidth: 1,
        borderRadius: 100,
        marginTop: 10,
        marginRight: 15,
        width: 90,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',  
      },
      tabText: {
        color: '#146356',
        fontSize: 18,
        fontWeight: '500'
      },
      separator: {
        height: 0.5,
        width: '96%',
        alignSelf: 'flex-end',
      },
      sectionHeaderContainer: {
        height: 10,
      },
      sectionHeaderText: {
        color: '#010101',
        fontSize: 23,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 15,
      },
      itemContainer: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#EBEDEE',
        marginTop: 10,
        borderRadius: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        
      },
      itemImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
      },
      itemTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(8, 32, 50, 0.5)',
        marginLeft:15,
        width:90,

      },   
      itemDescription: {
        color: 'rgba(8, 32, 50, 0.5)',
        fontSize: 9,
        marginLeft:15,
      },
      itemPrice: {
        fontSize: 15,
        color: '#082032',
        fontWeight: '700'
        
      },
      priceThrough:{
        textDecorationLine: 'line-through',
        fontSize: 15,
        color: '#082032',
        fontWeight: '700'
      },
      itemRow: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        width:190,
      },
      swipeRightZoneSub: {
        alignItems: 'center',
        backgroundColor: '#C4C4C4',
        width: 70,
        height: '91%',
        paddingVertical: 30,
        paddingHorizontal: 25,
        marginTop: 10,
      },
      swipeLeftZoneRemove: {
        alignItems: 'center',
        backgroundColor: '#F82814',
        width: 70,
        height: '91%',
        paddingVertical: 30,
        paddingHorizontal: 25,
        marginTop: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
      },
      img: {
        marginTop: 15,
        width: 35,
        height: 35,
      },
      btn_retour_view:{
        width: 30,
        height: 30,
        backgroundColor:'#146356',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 60/2,
        marginLeft:31,
        marginTop:15
    },
    btn_panier:{
      width: 20,
      height: 20,
      backgroundColor:'#146356',
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: "center",
      borderRadius : 40/2,
    },
    banderolle:{
      width: 15,
      height: 80,
      backgroundColor: 'rgba(20, 99, 86, 0.7);',
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: "center",
      marginLeft: -25,
      marginTop: -15,
      zIndex: 0
      
    },
    banderolle_txt:{
      color: '#ffffff',
      fontSize: 10,
    },
    box_x:{
      width: 50,
      height: 15,
      backgroundColor: '#EBEDEE',
      marginTop: -15,
      marginRight: -65,
      marginLeft: 10,
      zIndex: 1
    },
    box_y: {
      width: 15,
      height: 30,
      backgroundColor: '#EBEDEE',
      marginTop:33,
      marginLeft: 10,
    }
    });