
import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
    headerContainer: {
        
        // do i need this?
        // marginTop: 20,

        flexDirection: 'row',

        backgroundColor: '#333',
    },

    imageParentStyle: {
        
        width: 40,
        aspectRatio: 1,

        margin: 5,
    },

    imageStyle: {
        flex: 1
    },

    textParentStyle: {

        justifyContent: 'center',
        flex: 1,

        
    },

    textStyle: {
        marginLeft: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default headerStyles;
