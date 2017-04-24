import AppDimensions from '../../services/dimensions/Dimensions.js';


const { width, height } = AppDimensions;

const NavButtonStyles = {
    navButton: {
        borderWidth: 2,
        borderColor: 'white',

        height: 120,
        // backgroundColor: 'blue'
    },

    navImage: {
        height: 116,
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
        // color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 5,
    },
};

export default NavButtonStyles;