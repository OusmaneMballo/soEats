import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -33,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContain: {
    marginTop: 2,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#EBEDEE80',
    marginTop: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#082032',
    marginLeft: 10,
    marginTop: 5,
    width: 150
  },
  itemPrice: {
    fontSize: 15,
    color: '#082032',
    fontWeight: '700',
    marginTop: 13,
    marginLeft: -15

  },
  itemDesc: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(8, 32, 50, 0.5)',
    marginTop: 13
  },
  itemDescription: {
    marginTop: 10,
    color: 'rgba(8, 32, 50, 0.5)',
    fontSize: 9
  },
  itemRow: {
    flexDirection: 'row'
  },
  icon: {
    marginLeft: 15,
  },
  btn_txt: {
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 4,
    fontWeight: 'bold'
  },
  btn: {
    marginLeft: 110,
    width: 110,
    height: 30,
    backgroundColor: '#146356',
    borderRadius: 10
  },
  btn_retour: {
    width: 26,
    height: 26,
  },
  btn_clear: {
    width: 26,
    height: 26,
  },
  btn_retour_view: {
    marginTop: -120,
    width: 42,
    height: 42,
    backgroundColor: '#146356',
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42 / 2,
    marginLeft: 20
  },
  btn_clear_view: {
    marginTop: -115,
    width: 70,
    height: 35,
    backgroundColor: '#FFFFFF',
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginRight: 20,
    textAlign: 'center',
    backgroundColor: '#C0272D'
  },
  view_price: {
    flex: 0.2,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_price: {
    marginLeft: 13,
    fontWeight: 'bold'
  },
  textAreaContainer: {
    borderRadius: 20,
    backgroundColor: '#EBEDEE',
    width: 344,
    height: 140,
    margin: 12,
    marginTop: 30,
    padding: 10
  },
  textArea: {
    height: 80,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  swipeRightZoneSub: {
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    width: 70,
    height: '91%',
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginTop: 5,
  },
  swipeLeftZoneRemove: {
    alignItems: 'center',
    backgroundColor: '#F82814',
    width: 70,
    height: '91%',
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginTop: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  img: {
    marginTop: 15,
    width: 35,
    height: 35,
  },
  btn_panier: {
    width: 20,
    height: 20,
    backgroundColor: '#146356',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40 / 2,
  },
  banderolle: {
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
  priceThrough: {
    textDecorationLine: 'line-through',
    fontSize: 15,
    color: '#082032',
    fontWeight: '700',
    marginLeft: -15
  },
  banderolle_txt: {
    color: '#ffffff',
    fontSize: 10,
  },
  box_x: {
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
    marginTop: 33,
    marginLeft: 10,
  }
});