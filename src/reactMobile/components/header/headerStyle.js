import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: '#FFFFFF',
        marginLeft:20
    },
    searchBar: {
        marginTop: 5,
        backgroundColor: '#EBEDEE',
        width: windowWidth-130,
        height: windowHeight/23,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        paddingLeft:13,
        borderWidth: 0.7, 
        borderTopColor:'#3346FF',
        borderLeftColor:'#EBEDEE',
        borderRightColor:'#3346FF',
        borderBottomColor:'#3346FF',
    },
    content_loupe:{
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: 40,
        // height: 42,
        // width: windowWidth-400,
        height: windowHeight/23,
        backgroundColor: '#EBEDEE',
        marginLeft:5,
        borderWidth: 0.7, 
        borderTopColor:'#3346FF',
        borderLeftColor:'#3346FF',
        borderRightColor:'#EBEDEE',
        borderBottomColor:'#3346FF',

    },
    logo_content:{
        width: 40,
        borderRadius:20,
        height: windowHeight/19,
        backgroundColor: '#EBEDEE',
    },
    logo:{
        width: 40,
        borderRadius:20,
        height: windowHeight/19,
    },
    
    loupe:{
        width: 15,
        height: 15,
    }
});