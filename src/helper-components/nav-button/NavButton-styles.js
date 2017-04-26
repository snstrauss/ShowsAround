import AppDimensions from '../../services/dimensions/Dimensions.js';


const { width, height } = AppDimensions;

const NavButtonStyles = {
    navButton: {
        borderWidth: 2,
        borderColor: 'white',

        height: 150,
        // backgroundColor: 'blue'
    },

    navImage: {
        height: 150,
        width: width - 4,
    },

    navTextView: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 40,
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 1,
    },



    navText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 5,
        // marginTop: 5,
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
};

export default NavButtonStyles;