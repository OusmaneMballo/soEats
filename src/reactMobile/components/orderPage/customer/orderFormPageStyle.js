import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1.3,
        backgroundColor: '#FFFFFF',
        marginTop: -33,
        borderTopLeftRadius: 37,
        borderTopRightRadius: 37,
    },
    itemContainer: {
        backgroundColor: '#EBEDEE80',
        marginTop: 20,
        marginLeft:20,
        marginRight:20,
        borderRadius: 20,
        width:344,
        height:110,
    },
      itemImage: {
        width: 110,
        height: 100,
        borderRadius: 15,
    },
    itemTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(8, 32, 50, 0.5)',
        marginLeft: 10,
        marginTop:13
    },
    itemPrice: {
        fontSize: 15,
        color: '#082032',
        fontWeight: '500',
        marginTop:13

    },
    itemDesc:{
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(8, 32, 50, 0.5)',
        marginTop:13
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
    btn_txt:{
        color: '#FFFFFF',
        textAlign: 'center',
        paddingTop: 4,
        fontWeight: 'bold'
    },
    btn:{
        marginLeft:110,
        width: 120,
        height: 30,
        backgroundColor: '#146356',
        borderRadius: 10
    },
        btn_retour:{
        width :20,
        height : 18,
    },
    btn_retour_view:{
        marginTop:-120,
        width: 35,
        height: 35,
        backgroundColor:'#146356',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 35/2,
        marginLeft:20
    },
    view_price:{
        flex:0.3,
        backgroundColor:'#FFF', 
        flexDirection:'row',
        alignItems:'center',    
        justifyContent: 'center'
    },
    text_price:{
        marginLeft:13,
        fontWeight: 'bold'
    }
});