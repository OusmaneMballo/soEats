import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEDEE',
        marginTop: -35,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 15,
        paddingTop: 10
    },

    header:{
        flex: 0.35,
        width: '100%',
        height: 80,
        resizeMode: 'stretch',
    },

    text:{
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'justify'
    },
    flex_btn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    btn:{
        margin: 10,
        width: 122,
        height: 40,
        backgroundColor: '#146356',
        borderRadius: 15
    },

    btn_txt:{
        color: '#FFFFFF',
        textAlign: 'center',
        paddingTop: 9,
        fontWeight: 'bold'
    },

    horaire_screen:{
        flex:0.5,
        paddingTop:-280,
        backgroundColor:'#FFFFFF',

    },
    text_restau_images:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:16,
        fontStyle:'normal',
        padding:15
    },
    scroll_imgs:{
        flex:0.4,
        flexDirection:'row',

    },
    imgs_restau:{
        width:150,
        height:150,
        borderRadius:20,
        marginRight:20
    },
    btn_retour:{
        width :20,
        height : 18,
    },
    btn_retour_view:{
        marginTop:-120,
        width: 35,
        height: 35,
        backgroundColor:'#FFFFFF',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 35/2,
        marginLeft:20
    },
    
    
});