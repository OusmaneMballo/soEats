import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: 158,
        height:158,
        backgroundColor: 'rgba(52, 52, 52, 0.01)',
        borderRadius : 20,
        marginTop: -100,
        justifyContent: 'center',
        alignItems: "center",
        marginLeft:108
        
    },

    img_Logo:{
        width: 158,
        height: 158,
        borderRadius : 158/2,
        resizeMode:'cover'
    },

    img_View:{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 80/2,
        width: 80,
        height: 80,
        borderWidth: 2,
        textAlign: "center",
        borderColor: '#146356',
        margin: 30,  
    },

    text_name:{
        color: 'rgba(8, 32, 50, 0.5)',
        fontSize: 14,
        fontWeight: 'bold'
    },

    text_address:{
        marginTop: 20,
        color: 'rgba(8, 32, 50, 0.5)',
        fontSize: 14,
    }

});