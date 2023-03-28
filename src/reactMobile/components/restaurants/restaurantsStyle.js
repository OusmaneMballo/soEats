import { Center } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15

  },
  img: {
    marginTop: -1,
    borderRadius: 20,
    resizeMode: 'stretch',
    height: hp('21%'), // 21% of height device screen
    width: wp('44%'),   // 45% of width device screen
  },
  content_affichage_restaurants:{
    backgroundColor:'#FCFEFF',
    borderRadius:20, 
    margin:4,
    borderWidth:1.5,
    borderColor:'#EBEDEE'
  },
  affichage_restaurants: {
    flex: 0.5,
    alignItems: 'center',
    margin: 5,
    backgroundColor:'#fff',
    borderRadius:20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  view_restaurant_title:{
    flexDirection:'row', 
    justifyContent:'space-around', 
    marginBottom:8
  },
  restaurant_title:{
    fontWeight:'700', 
    fontSize:14
  },
  searchBar: {
    marginTop: 5,
    backgroundColor: '#EBEDEE',
    width: windowWidth - 160,
    height: windowHeight / 23,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingLeft: 13,
    marginLeft: -1,
    borderLeftColor: '#EBEDEE',
    borderRightColor: '#146356',
    borderBottomColor: '#146356',
  },
  content_loupe: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 40,
    height: windowHeight / 23,
    backgroundColor: '#EBEDEE',
    marginLeft: 15,

  },
  logo_content: {
    width: 40,
    borderRadius: 20,
    height: windowHeight / 19,

  },
  logo: {
    width: 55,
    borderRadius: 20,
    height: windowHeight / 19,
  },
  pannier_content: {
    borderRadius: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'

  },
  pannier: {
    width: 25,
    borderRadius: 20,
    height: windowHeight / 28,
    margin: 0
  },
  row_categories: {
    flexDirection: 'row',
    padding: 15, 
    justifyContent: 'center'
  },
  logo_content_categorie: {
    width: 60,
    borderRadius: 15,
    elevation: 2,
    height: windowHeight / 13,
    backgroundColor: '#146356',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',

  },
  logo_content_categories: {
    width: 60,
    borderRadius: 10,
    height: windowHeight / 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    marginHorizontal: 5
  },
  img_all_cat: {
    width: 20,
    height: windowHeight / 40,
    borderRadius: 1,
  },
  imgs_cat: {
    width: 55,
    height: windowHeight / 15,
    resizeMode: 'stretch',
    borderRadius: 50
  },
  loupe: {
    width: 15,
    height: 15,
  },
  header_view: {
    marginTop: 50,
    alignItems: 'center',
    alignItems: 'center'
  },
  text_categories: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 16,
    fontStyle: 'normal'
  },
  view_choix_restaurant: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  text_view_choix_restaurant: {
    marginTop: 10,
    paddingBottom: 10,
    fontWeight: '400',
    fontSize: 16,
    fontStyle: 'normal'
  },
  promo_content: {
    flexDirection: 'row',
  },

  promo_box: {
    margin: 5,
    marginLeft: 12,
    width: 330,
    height: 80,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    backgroundColor: "#B3E59F"
  },

  row: {
    flexDirection: "row",
    alignItems: 'center',
    width: 100,
    marginBottom: 10,
  },
  textPromo: {
    fontWeight: '700',
    fontSize: 13,
    fontStyle: 'normal',
    color: "#000000"
  },
  imgPromo: {
    width: 155,
    height: 80,
    borderRadius: 10,
    marginRight: 10
  },
  logoResto: {
    width: 60,
    height: 50,
    marginTop: 5,
    marginLeft: 0,
    borderRadius: 5
  },
  footer: {
    backgroundColor: '#146356',
    marginTop: -20,
    height: 75,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  images_footer: {
    width: 25,
    height: 25
  },
  text_footer: {
    marginTop: 5,
    fontStyle: 'normal',
    fontSize: 12,
    color: '#EBEDEE80',
    fontWeight: '500',
    textAlign: 'center'
  },
  elements_footer: {
    alignItems: 'center'
  }
});