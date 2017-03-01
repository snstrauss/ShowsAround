
import Color from '../../services/random-color/randomColor.js';

const ShowStyles = {
    showBox: {
        borderBottomWidth: 1,
        // maxHeight: 201,
    },

    imageParent: {
        borderBottomWidth: 1
    },

    imageStyle: {
        // height: 200,
    },

    textParent: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        right: 0,
        left: 0,
        height: 30,
        zIndex: 1,
    },

    titleStyle: {
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold',
        position: 'absolute',
        top: 0,
        right: 5,
    },

    detailsParent: {
        backgroundColor: 'black',
        borderBottomWidth: 1,
        maxHeight: 1000000,
    },

    detailsStyle: {
        color: 'lightgrey',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'right',
        // right: 5,
        margin: 10,
    },

    priceParent: {
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 45,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    },

    priceStyle: {
        fontSize: 17,
        borderRadius: 10,
        color: 'white',
        fontWeight: 'bold',
    }
}

export default ShowStyles;
